const Model = require('../classes/model');

class RLUserFavoriteModel extends Model {

    /**
     * constructor
     */
    constructor() {
        super('rl_user_favorite');
    }

    findByFavoriteUser({ id_favorite_user }) {
        return this.db.select([
            'user.*',
        ]).from('rl_user_favorite')
            .innerJoin('user', 'user.id', 'rl_user_favorite.id_user')
            .where({
                'rl_user_favorite.id_favorite_user': id_favorite_user
            });
    }

    findAllFavorite({ id_user }) {
        return this.db.select([
            'user.id',
            'user_information.skin_color',
            'user_information.eye_color',
            'user_information.stature',
            'user_information.blood_type',
            'user_information.hair_color',
            'user_information.hair_texture',
            'user_information.formation',
            this.db.raw("CONCAT(city.name, ',', state_province.name) as location")
        ]).from('rl_user_favorite')
            .innerJoin('user', 'user.id', 'rl_user_favorite.id_favorite_user')
            .innerJoin('user_information', 'user_information.id_user', 'rl_user_favorite.id_favorite_user')
            .innerJoin('city', 'city.id', 'user.id_city')
            .innerJoin('state_province', 'state_province.id', 'city.id_state_province')
            .where({
                'rl_user_favorite.id_user': id_user
            });
    }

}

module.exports = new RLUserFavoriteModel();