const express = require('express');
import * as mensagemController from "../controller/mensagemController";



const router = express.Router();


router.post('/', mensagemController.createMensagem);
router.get('/', mensagemController.getMensagens);
router.get('/:id', mensagemController.getMensagemById);
router.put('/:id', mensagemController.updateMensagem);
router.delete('/:id', mensagemController.deleteMensagem);

export default  router;
