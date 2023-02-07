# ONG Cats and Dogs

Visando ajudar, da minha forma, a causa animal eu desenvolvi essa aplicação que basicamente serve para gerenciamento de uma ONG de doação animal. Na aplicação será possível: 

- Criar pontos de atendimentos (Service points)
- Registrar animais para adoção
- Marcar animais como adotados
- Criar usuário
- Criar transações (Movimentações financeiras) de cada Ponto de Atendimento. 

*Ponto de Atendimento* 

- Tem seu próprio saldo, baseado nas transações. 
- Tem seus animais registrados. 

*Animais*

- Contém diversas informações que podem estar registradas. 
- Contém informações de saúde do animal e outros. 
- Cada animal pertence a um Ponto de Atendimento. 

*Usuário* 

- Contém diversas informações. 
- Cada usuário tem seu usuário e senha para realizar a autenticação. 
- Existem dois tipos de usuário: 
    - Tipo 2 ->  
        - Deletar, criar, atualizar usuários bem como pegar uma lista completa de todos. 
        - Deletar, criar, atualizar animais bem como pegar uma lista completa de todos (independentemente de seu Ponto de Atendimento). 
        - Deletar, criar, atualizar transações bem como pegar uma lista completa de todos (independentemente de seu Ponto de Atendimento).
        - Conseguir visualizar o saldo de todos os Ponto de Atendimentos bem como o seu específico.  

    - Tipo 1 -> 
        - Consegue realizar um certo limite de operações como:  
            - criar, animais bem como pegar uma lista completa de todos. 
            - Conseguir visualizar o saldo de seu Ponto de Atendimento. 
