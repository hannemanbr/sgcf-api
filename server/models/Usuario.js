const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const UsuarioSchema   = new Schema({
  login: { type: String },
  password: String,
  email: { type: String, unique: true },
  nome: String,
  perfil: [String],
  ativo: { type: Boolean, default: true },  
  dados: new Schema ({    
    tipo: String,    
    presidente: Boolean,
    descricao: String,
    complemento: new Schema ({ 
      cargo: String,
      matricula: String,
      dataNascimento: Date,
      dataAdmissao: Date,
      crc: String,
      cpf: String,
      identidade: String,
      dataExpedicao: Date,
      orgaoEmissor: String,
      telefone: String,
      celular: String,
      fax: String,
    }, { _id: false }),
    dadosTerceiros: new Schema ({ 
      planoSaude: String,
      declaracaoIREntregue: Boolean,
      secretarias: String,
      secretariasEmail: String
    }, { _id: false }),
    viagensTerceiros: new Schema ({ 
      numeroCartaoFidelidade: String,
      smiles: String,
      preferenciaCiaAerea: String,
      janelaCorredor: String,
      assento: String,
      fumante: Boolean
    }, { _id: false }),
  }, { _id: false }),
  enderecos: [new Schema ({
    tipoEndereco: String,
    rua: String,
    complemento: String,
    bairro: String,
    cep: String,
    cidade: String,
    uf: String
  }, { _id: false })],
  contasBancarias: [new Schema ({
    banco: String,
    agencia: String,
    contaCorrente: String,
    cidade: String,
    padrao: Boolean
  }, { _id: false })],
  representatividade: [new Schema ({
    tipo: String,
    titularidade: String,
    representacao: String,
    posseCF: Date,
    livro: String,
    pagina: String,
    expiracaoMandato: Date,
    movimentacao: String,
    tipoDocumento: String,
    documento: String,
    dataDocumento: Date
  }, { _id: false })],
  criadoEm: { type: Date, default: Date.now },
  atualizadoEm: { type: Date, default: Date.now },
  excluido: Boolean
}, { versionKey: false });

UsuarioSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Usuario', UsuarioSchema);