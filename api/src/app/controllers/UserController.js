import User from "../models/entities/User";
import bcrypt from 'bcryptjs';
import bcryptConfig from '../../config/bcrypt';

class UserController {
	async store(req, res) {
		// Encriptando password
		const hash = bcrypt.hashSync(req.body.password, bcryptConfig.saltRounds);
		req.body.password = hash;

		const user = await User.create(req.body);
		return res.json(user)
	}
	async index(req, res) {
		const users = await User.findAll({
			attributes: [
				'id', 'name', 'username', 'is_office'
			]
		});
		return res.json(users)
	}
	async update(req, res) {
		let user = await User.findByPk(req.params.id);

		user = await user.update(req.body)
		return res.json(user)
	}
	async delete(req, res) {
		let user = await User.findByPk(req.params.id);
		user = await user.destroy(req.body)
		return res.json(user)
	}
	async show(req, res) {
		let user = await User.findByPk(req.params.id, {
			attributes: [
				'id', 'name', 'username', 'is_office'
			]
		})
		return res.json(user)
	}
}

export default new UserController();