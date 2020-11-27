import Consultation from "../models/Consultation";

class ConsultationController {
  async store(req, res) {
    const consultation = await Consultation.create(req.body);
    return res.json(consultation)
  }
  async index(req, res) {
    const consultations = await Consultation.findAll({
        attributes: [
            'id','time', 'value', 'is_paid', 'is_confirmed'
        ],
        include: [
            { 
                model: Client,
                as: 'client'
            },
            {
                model: Procedure,
                as: 'procedure'
            },
            {
                model: Tooth,
                as: 'tooth'
            }
        ]
    });
    return res.json(consultations)
  }
  async update(req, res) {
    let consultation = await Consultation.findByPk(req.params.id)
    consultation = await consultation.update(req.body)
    return res.json(consultation)
  }
  async delete(req, res) {
    let consultation = await Consultation.findByPk(req.params.id)
    consultation = await consultation.destroy(req.body)
    return res.json(consultation)
  }
  async show(req, res) {
    let consultation = await Consultation.findByPk(req.params.id, {
        attributes: [
            'id','time', 'value', 'is_paid', 'is_confirmed'
        ],
        include: [
            { 
                model: Client,
                as: 'client'
            },
            {
                model: Procedure,
                as: 'procedure'
            },
            {
                model: Tooth,
                as: 'tooth'
            }
        ]
    })
    return res.json(consultation)
  }
}

export default new ConsultationController();