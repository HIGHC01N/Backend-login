const express = require('express');
const session = require('express-session');
const fileStore = require('session-file-store')(session);
const passport = require('passport'),GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const app = express();

let db = [{
    id : '1',
    email : 'hello@gmail.com',
    password : 'hellomyfriend',
    name : 'hyoa',
    provider : '',
    token : '',
    providerId : ''

}];

const googleCredentials = {
    "web":{
        "client_id":"372810983421-38jhfdn0po7lrjdk5ajohpvp5qcqdn14.apps.googleusercontent.com",
        "client_secret":"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",
        "redirect_uris":[
            "http://localhost:3000/auth/google/callback"
        ]
    }
}

app.use(express.urlencoded({extended:false}));
app.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUninitialized:false,
    store:new fileStore()
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done){
    done(null,user);
});
passport.deserializeUser(function(user,done){
    done(null,user);
});

passport.use(new GoogleStrategy({
    clientID: googleCredentials.web.client_id,
    clientSecret: googleCredentials.web.client_secret,
    callbackURL: googleCredentials.web.redirect_uris[0]
    },
    function(accessToken, refreshToken, profile, done){
        console.log(callbackURL);
        let user = db.find(userInfo => userInfo.email === profile.emails[0].value);
        if(user){
            user.provider = profile.provider;
            user.providerId = prifile.id;
            user.token = accessToken;
            user.name = profile.displayName;
        }else{
            user = {
                id : 2,
                provider : profile.provider,
                providerId : profile.id,
                token : accessToken,
                name : profile.displayName,
                email : profile.emails[0].value
            }
            db.push(user);
        }
        return done(null, user);
    }
));

app.get('/auth/google',
   passport.authenticate('google', {scope: ['email', 'profile']})
);

app.get('/auth/google/callback',
    passport.authenticate('google',{failureRedirect: '/auth/login'}),
    function(req, res){
        res.redirect('/');
    });

app.get('/',(req,res)=>{
    const temp = getPage('Welcome', 'Welcome to visit...',getBtn(req.user));
    res.send(temp);
});

app.get('/auth/logout', (req,res,next)=>{
    req.session.destroy((err)=>{
        if(err) next(err);
        req.logOut();
        res.cookie(`connect.sid`,``,{maxAge:0});
        res.redirect('/');
    });
});

app.use((err,req,res,next)=>{
    if(err) console.log(err);
    res.send(err);
});

const getBtn = (user) =>{
    return user !== undefined ? `${user.name} | <a href = "/auth/logout">logout</a>` : `<a href = "/auth/google">Google login</a>`;
}

const getPage = (title, description, auth)=>{
    return`
    <!DOCTYPE html>
    <html lang = "en">
    <head>
        <meta charset = "UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name = "viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
    </head>
    <body>
        ${auth}
        <h1>${title}</h1>
        <p>${description}</p>
    </body>
    </html>
    `;
}

app.listen(3000, ()=>console.log('http://localhost:3000'))

