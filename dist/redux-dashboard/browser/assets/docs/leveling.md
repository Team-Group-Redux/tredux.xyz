# Nivelamento

---

# Como funciona o XP
Os membros ganham XP digitando uma mensagem.
Cada vez que eles enviam uma mensagem, `xpPerMessage` é adicionado ao seu XP atual.

**Limitando XP**:
- Máximo de mensagens por minuto
- XP por mensagem

`Nível preciso = (-75 + sqrt(75^2 - 300(-150 - xp))) / 150`

`XP para o próximo nível = (75(level + 1)^2 + 75(level + 1) - 150) - xp`

**Ganhando XP**:
- Mensagens filtradas com mod auto não ganham EXP

## Ranking
As classificações dos membros são baseadas em seus XP totais.
Não há sistema de classificação secundária (desempates) - quando dois usuários têm o mesmo XP.

---

### Funções ignoradas
Funções que estão isentas de ganhar XP.
Por exemplo, se você tivesse o papel `@NoXP` e o papel fosse um papel ignorado, você não seria capaz de ganhar XP.

### Funções de Nível
Ganhe um papel específico ao atingir um nível.
Por exemplo, se o `Nível 5` tivesse uma função de nível `@Bronze`, e você acabasse de atingir o nível 5, você receberia essa função.

### Máximo de mensagens por minuto `3`
Quantas mensagens, durante o mesmo minuto, ganharão XP.
Isso ajuda a evitar spam, limitando a quantidade de mensagens que podem gerar XP em um minuto.

Se um usuário enviar mais mensagem do que esse valor, ele simplesmente não ganhará EXP com aquela mensagem, naquele minuto.
Se for 16:41 e <User> enviar 4 mensagens, eles só ganharão EXP por 3 mensagens e podem começar a ganhar novamente quando for 16:42.

### XP por mensagem `50`
Quanto XP é adicionado, cada vez que um usuário ganha XP.
