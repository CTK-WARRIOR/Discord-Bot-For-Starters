const express = require("express");
const bodyParser = require("body-parser");
const url = require("url");
const path = require("path");
const passport = require("passport");
const Strategy = require("passport-discord").Strategy;
const ejs = require("ejs");
const BotConfig = require("../settings.json");
const WebConfig = require("./webconfig.json");
const { Permissions } = require("discord.js");
const { config } = require("process");
const GuildSettings = require("../models/guildsettings");

module.exports = (client) => {
  // PATHS
  const dataDir = path.resolve(`${process.cwd()}${path.sep}dashboard`); // The absolute path of current this directory.
  const templateDir = path.resolve(`${dataDir}${path.sep}templates`); // Absolute path of ./templates directory.

  const app = express();
  const session = require("express-session");
  const MemoryStore = require("memorystore")(session);

  //Initialize Discord login
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });
  passport.use(
    new Strategy(
      {
        clientID: WebConfig.config.client_id,
        clientSecret: WebConfig.config.client_secret,
        callbackURL: WebConfig.config.callback,
        scope: ["identify", "guilds", "guilds.join"],
      },
      (accessToken, refreshToken, profile, done) => {
        process.nextTick(() => done(null, profile));
      }
    )
  );

  app.use(
    session({
      store: new MemoryStore({ checkPeriod: 86400000 }),
      secret: `#@%#&^$^$%@$^$&%#$%@#$%$^%&$%^#$%@#$%#E%#%@$FEErfgr3g#%GT%536c53cc6%5%tv%4y4hrgrggrgrgf4n`,
      resave: false,
      saveUninitialized: true,
    })
  );

  //Middlewares
  app.use(passport.initialize());
  app.use(passport.session());

  app.engine("ejs", ejs.renderFile);
  app.set("view engine", "ejs");

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  //assets
  app.use("/", express.static(path.resolve(`${dataDir}${path.sep}assets`)));

  //renderTemplate function
  const renderTemplate = (res, req, template, data = {}) => {
    const baseData = {
      bot: client,
      path: req.path,
      user: req.isAuthenticated() ? req.user : null,
    };
    res.render(
      path.resolve(`${templateDir}${path.sep}${template}`),
      Object.assign(baseData, data)
    );
  };

  //checkauth
  const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    req.session.backURL = req.url;
    res.redirect("/login");
  };

  //login endpoint
  app.get(
    "/login",
    (req, res, next) => {
      if (req.session.backUrl) {
        req.session.backUrl = req.session.backUrl;
      } else if (req.headers.referer) {
        const parsed = url.parse(req.headers.referer);
        if (parsed.hostname === app.locals.domain) {
          req.session.backURL = parsed.path;
        }
      } else {
        req.session.backURL = "/";
      }
      next();
    },
    passport.authenticate("discord")
  );

  // Callback endpoint.
  app.get(
    "/callback",
    passport.authenticate("discord", { failureRedirect: "/" }),
    /* We authenticate the user, if user canceled we redirect him to index. */ (
      req,
      res
    ) => {
      // If user had set a returning url, we redirect him there, otherwise we redirect him to index.
      if (req.session.backURL) {
        const backURL = req.session.backURL;
        req.session.backURL = null;
        res.redirect(backURL);
      } else {
        res.redirect("/");
      }
    }
  );

  // Logout endpoint.
  app.get("/logout", function (req, res) {
    // We destroy the session.
    req.session.destroy(() => {
      // We logout the user.
      req.logout();
      // We redirect user to index.
      res.redirect("/");
    });
  });

  app.get("/", (req, res) => {
    renderTemplate(res, req, "index.ejs", {
      discordInvite: WebConfig.website.support,
    });
  });

  //dashboard
  app.get("/dashboard", (req, res) => {
    renderTemplate(res, req, "dashboard.ejs", {
      perms: Permissions,
    });
  });

  // settings endpoint
  app.get("/dashboard/:guildID", checkAuth, async (req, res) => {
    // We validate the request, check if guild exists, member is in guild and if member has minimum permissions, if not, we redirect it back.
    const guild = client.guilds.cache.get(req.params.guildID);
    if (!guild) return res.redirect("/dashboard");
    let member = guild.members.cache.get(req.user.id);
    if (!member) {
      try {
        await guild.members.fetch();
        member = guild.members.cache.get(req.user.id);
      } catch (err) {
        console.error(`Couldn't fetch the members of ${guild.id}: ${err}`);
      }
    }
    if (!member) return res.redirect("/dashboard");
    if (!member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
      return res.redirect("/dashboard");
    }

    // We retrive the settings stored for this guild.
    let storedSettings = await GuildSettings.findOne({ guildID: guild.id });
    if (!storedSettings) {
      // If there are no settings stored for this guild, we create them and try to retrive them again.
      const newSettings = new GuildSettings({
        guildID: guild.id,
      });
      await newSettings.save().catch((e) => {
        console.log(e);
      });
      storedSettings = await GuildSettings.findOne({ guildID: guild.id });
    }

    renderTemplate(res, req, "settings.ejs", {
      guild,
      settings: storedSettings,
      alert: null,
    });
  });

  // Settings endpoint
  app.post("/dashboard/:guildID", checkAuth, async (req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
    if (!guild) return res.redirect("/dashboard");
    const member = guild.members.cache.get(req.user.id);
    if (!member) return res.redirect("/dashboard");
    //perm check
    if (!member.permissions.has(Permissions.FLAGS.MANAGE_GUILD))
      return res.redirect("/dashboard");

    // we retrieve the guild settings
    const storedSettings = await GuildSettings.findOne({ guildID: guild.id });
    if (!storedSettings) {
      const newSettings = new GuildSettings({
        guildID: guild.id,
      });
      await newSettings.save().catch((err) => console.log(err));
      storedSettings = await GuildSettings.findOne({ guildID: guild.id });
    }

    storedSettings.prefix = req.body.prefix;
    await storedSettings.save().catch((err) => console.log(err));

    renderTemplate(res, req, "settings.ejs", {
      guild,
      settings: storedSettings,
      alert: "Settings saved!",
    });
  });

  const http = require("http").createServer(app);
  http.listen(WebConfig.config.port, () => {
    console.log(
      `Website is listening to the port ${WebConfig.config.port} on ${WebConfig.website.domain} domain.`
    );
  });
};
