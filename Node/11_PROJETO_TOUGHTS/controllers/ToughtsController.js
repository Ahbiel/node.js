import Tought from '../models/Tought.js'
import User from '../models/User.js'

export default class ToughtsController {
    static async showToughts(req,res) {
        res.render('toughts/home')
    }
    static async dashboard(req,res){
        const userId = req.session.userid;
        const user = await User.findOne({
            where:{id:userId},
            include: Tought, //tráz todos os pensamentos do usuário
            plain: true
        })
        if(!user){
            res.redirect('/login')
        }
        console.log(user.Toughts)
        // const toughts = user.Toughts.map((result)=>{
        //     console.log(result.dataValues)
        // })
        const toughts = user.Toughts.map((result)=>result.dataValues)
        let emptyToughts = false
        if(toughts.length === 0){
            emptyToughts = true
        }
        res.render('toughts/dashboard', {toughts,emptyToughts})
    }
    static createTought(req,res){
        res.render('toughts/create')
    }
    static async createToughtSave(req,res){
        const tought = {
            title: req.body.title,
            UserId: req.session.userid
        }
        try {
            await Tought.create(tought)
            req.flash('message', 'Pensamento criado com sucesso')
            req.session.save(()=>{
                res.redirect('/toughts/dashboard')
            })
        } catch (error) {
            console.log(error)
        }
    }
    static async removeTought(req,res){
        const id = req.body.id
        const userId = req.session.userid
        try {
            await Tought.destroy(
                {where:{
                    id:id, 
                    userId: userId
                    //filtro duplo
                }}
            )
            req.flash('message', 'Pensamento removido com sucesso')
            req.session.save(()=>{
                res.redirect('/toughts/dashboard')
            })
        } catch (error) {
            console.log(error)
        }
    }
}