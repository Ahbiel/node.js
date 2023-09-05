import Tought from '../models/Tought.js'
import User from '../models/User.js'

export default class ToughtsController {
    static async showToughts(req,res) {
        // Vamos renderizar todos os pensamentos na Home
        // const toughtsData = await Tought.findAll({
        //     include: User //vamos incluir o usuário também, possibilitando o this.User.
        // })
        // const toughts = toughtsData.map((result)=>result.get({plain:true}))
        // res.render('toughts/home',{toughts})

        await Tought.findAll({include: User}).then((data)=>{
            const toughts = data.map((value)=>{
                return value.get({plain:true})
            })
            res.render('toughts/home',{toughts})
        }).catch((err)=>{
            console.log(err)
        })
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
        // console.log(user.Toughts)
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
    static async updateTought(req,res){
        const id = req.params.id
        const tought = await Tought.findOne({where:{id:id}, raw:true})
        res.render('toughts/edit',{tought})
    }
    static async updateToughtSave(req,res){
        const id = req.body.id
        const userId = req.session.userid;
        const toughts = {
            title: req.body.title
        };
        await Tought.update(toughts,{where:{id:id}, userId: userId})
        res.redirect('dashboard')
    }
}