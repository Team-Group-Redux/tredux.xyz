# Auto Mod
Deixe o Redux filtrar conteúdo explícito, spam e muito mais!

---

## Auto Delete Messages `true`
Se deseja excluir automaticamente as mensagens filtradas.

## Auto Warn Users `false`
Avisar automaticamente os usuários que digitam uma mensagem filtrada.

## Ban Links
Caracteres únicos, ou partes de uma palavra, que acionam o filtro `Links`.

## Ban Words
Palavras únicas que acionam o filtro `Palavras`.

## Filtros
Filtre o conteúdo da mensagem com base em condições específicas.

| Filtro             | Exemplo de gatilho                       | Condição
|:-------------------|:-----------------------------------------|:-------------------------------------------|
| Bad Links          | [saved bad link address]                 | A mensagem contém link personalizado inválido
| Bad Words          | [listed bad word]                        | Quaisquer palavras são iguais a palavrões personalizados

## Ignored Roles
Funções que não são afetadas pelo mod automático.
Um caso de uso para isso pode ser uma função Admin, onde Admins podem `SPAM CAPS IN CHAT` e assistir outros membros sofrerem tentando fazer a mesma coisa.