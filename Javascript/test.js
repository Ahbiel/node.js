class Carro{
	constructor(c){
		this.cor=c
	}
    set mudar(v){ 
        this.cor = v
    }
}
let c1=new Carro("vermelho")
let c2=new Carro("preto")
c2.mudar = "Amarelo"
console.log(c1.cor) //vermelho
console.log(c2.cor) //amarelo