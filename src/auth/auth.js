import bcrypt from 'bcryptjs';
import { Strategy  } from 'passport-local';

import User from "../app/models/entities/User";

module.exports = function(passport){ 
 
    async function findUserByUsername(username){
        const user = await User.findOne({
            where: {
                username: username
            }
        });

        return user;
    }
    
    async function findUserById(id){
        const user = await User.findByPk(id);

        return user;
    }

    // Serializa um objeto do tipo User
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
 
    // Desserizaliza (recupera) um objeto do tipo user
    passport.deserializeUser((id, done) => {
        try {
            const user = findUserById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });

    passport.use(new Strategy (
        
        async (username, password, done) => {
            try {
                const user = await findUserByUsername(username);
    
                // Caso em que o usuário não existe
                if (!user) { return done(null, false) }
    
                // Se o usuário existe, então verificamos a senha
                const isValid = bcrypt.compareSync(password, user.password);
                if (!isValid) return done(null, false)
                
                return done(null, user)
            } catch (err) {
                done(err, false);
            }
        }
    ));
}