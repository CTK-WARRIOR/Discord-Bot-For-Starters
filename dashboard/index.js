const express = require('express');
const bodyParser = require('body-parser');
const url = require('url');
const path = require('path');
const passport = require('passport');
const Strategy = require('passport-discord').Strategy;
const ejs = require('ejs');
const BotConfig = require('../settings.json');
const WebConfig = require('./webconfig.json');
const { Permissions } = require('discord.js');
const { config } = require('process');

module.exports = client => {
    // PATHS
    const dataDir = path.resolve(`${process.cwd()}${path.sep}dashboard`); // The absolute path of current this directory.
    const templateDir = path.resolve(`${dataDir}${path.sep}templates`); // Absolute path of ./templates directory.

    const app = express();
    const session = require('express-session');
    const MemoryStore = require('memorystore')(session);

    //Initialize Discord login
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((obj, done) => {
        done(null, obj);
    });
    passport.use(new Strategy({
        clientID: WebConfig.config.client_id,
        clientSecret: WebConfig.config.client_secret,
        callbackURL: WebConfig.config.callback,
        scope: ['identify', 'guilds', 'guilds.join']
    },
    (accessToken, refreshToken, profile, done) => {
        process.nextTick(() => done(null, profile));
    }

    ));

    app.use(session({
        store: new MemoryStore({ checkPeriod: 86400000 }),
        secret: `#@%#&^$^$%@$^$&%#$%@#$%$^%&$%^#$%@#$%#E%#%@$FEErfgr3g#%GT%536c53cc6%5%tv%4y4hrgrggrgrgf4n`,
        resave: false,
        saveUninitialized: true
    }));

    //Middlewares
    app.use(passport.initialize());
    app.use(passport.session());

    app.engine('ejs', ejs.renderFile)
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, './templates'));

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
        }
        res.render(
            path.resolve(`${templateDir}${path.sep}${template}`),
            Object.assign(baseData, data)
        )
    }

    //checkauth
    const checkAuth = (req, res, next) => {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.redirect('/login');
        }
    }

    //login endpoint
    app.get('/login', (req, res, next) => {
        if(req.session.backUrl) {
            req.session.backUrl = req.session.backUrl;
        } else if (req.headers.referer) {
            const parsed = url.parse(req.headers.referer);
        if (parsed.hostname === app.locals.domain) {
          req.session.backURL = parsed.path;
        }
        } else {
            req.session.backURL = '/';
        }
        next();
    }, passport.authenticate('discord'));

    //callback
    app.get('/callback', passport.authenticate("discord", { failureRedirect: "/" }), async (req, res) => {
        if(req.session.backUrl) {
            const backUrl = req.session.backUrl;
            req.session.backUrl = null;
            res.redirect(backUrl);
        } else {
            res.redirect('/');
        }
    });

    //logout
    app.get('/logout', function(req, res) {
        req.session.destroy(() => {
            res.redirect('/');
            req.logout();
        });
    })

    app.get('/', (req, res) => {
        renderTemplate(res, req, 'index.ejs', {
            discordInvite: WebConfig.website.support
        });
    });

    //dashboard
    app.get('/dashboard', (req, res) => {
        renderTemplate(res, req, 'dashboard.ejs', {
            perms: Permissions
        })
    });

    const http = require('http').createServer(app);
    http.listen(WebConfig.config.port, () => {
        console.log(`Website is listening to the port ${WebConfig.config.port} on ${WebConfig.website.domain} domain.`);
    });
}