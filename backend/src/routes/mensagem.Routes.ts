const express = require('express');
import * as mensagemController from "../controller/mensagemController";



const router = express.Router();


router.post('/mensagens', mensagemController.createMensagem);
router.get('/mensagens', mensagemController.getMensagens);
router.get('/mensagens/:id', mensagemController.getMensagemById);
router.put('/mensagens/:id', mensagemController.updateMensagem);
router.delete('/mensagens/:id', mensagemController.deleteMensagem);

export default  router;
