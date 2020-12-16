# Logs
Receba mensagens quando algo acontecer.

[i] Certifique-se de que Redux tenha acesso ao canal para poder enviar mensagens.

---

## Events
Respostas personalizadas para eventos específicos.

---

## Types
Tipos de Eventos

Event               | Descrição
:-------------------|:----------------------------
Ban                 | Banir membro do Servidor
Config Update       | A configuração do bot foi alterada
Level Up            | O usuário atinge um novo nível de XP
Entrada de Membro   | Novo Membro no Servidor
Saida de Membro     | Saida do Membro no Servidor
Mensagem Apagada    | A mensagem do usuário foi excluída
Unban               | O Ban do Usuário foi desbanido do Servidor
Warn                | O usuário é avisado com o comando `warn`

---

## Eventos variáveis
Variáveis ​​de eventos são usadas na mensagem e fornecem mais contexto para uma mensagem.

Variable        | Description                           | Example             | Events
:---------------|:--------------------------------------|:--------------------|:-----------------------------|
`[GUILD]`         | Nome Do Server                      | Test Guild          | All        
`[INSTIGATOR]`    | Menção do usuário sobre o punidor   | <BotUser>           | WARN        
`[MEMBER_COUNT]`  | Número de membros no Server         | 420                 | All
`[MESSAGE]`       | Conteúdo de uma mensagem            | Hello Earth         | MESSAGE_DELETED
`[MODULE]`        | O nome do módulo que foi atualizado | General             | CONFIG_UPDATE
`[NEW_LEVEL]`     | O novo nível de um membro           | 2                   | LEVEL_UP
`[NEW_VALUE]`     | O novo valor da configuração        | { "prefix":"." }    | CONFIG_UPDATE
`[OLD_LEVEL]`     | O antigo nível de um membro         | 1                   | LEVEL_UP
`[OLD_VALUE]`     | O antigo valor da configuração      | { "prefix": "/" }   | CONFIG_UPDATE
`[REASON]`        | Razão registrada para punição       | Enviando spam '🤔' continuamente      | WARN
`[USER]`          | Menção do usuário                   | <User>              | All
`[XP]`            | O XP atual de um membro             | 69425               | LEVEL_UP