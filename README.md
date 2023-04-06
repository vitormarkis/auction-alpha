## NEXT AUTH Failed To Fetch

Cara eu simplesmente não consigo acreditar que eu passei horas quebrando a cabeça, procurando em todos os lugares, uma solução pro erro failed to fetch do next auth quando na verdade a solução era apenas:
**Solução:** Caso esteja utilizando a tag form, colocar os `botões` de logar dos provider, como `tipo button`.

## NEXT AUTH passando dados personalizados do provider para o client

Isso deve ser feito através dos callbacks, dentro do objeto do NextAuth em `[...nextauth]`.
O user que existe dentro dos parametros dos callbacks, **ele vem do banco de dados**, então se não tiver uma coluna pra esse tipo de dado que você quer buscar, o user dentro do parametro nunca vai ter a propriedade que você deseja.

Você pode alterar o que é salvo no banco de dados pelo método `profile` dentro de `authOptions > providers > [seu provider] > profile() {}`, segue o exemplo:

```tsx
  profile(profile: GithubProfile) {
    profile = {
      /**
       * Esse objeto será salvo no banco de dados.
       * Você pode resgatar ele nas funções callbacks, através do user
       */
      }
    return profile
  }
```

Pegando o exemplo do Github, quando você faz login usando o provider, ele redireciona você para a rota de callback, e lá é disparado uma função callback que recebe **profile como argumento**, e no profile, se você tipar ele (`profile: GithubProfile`), ele terá todas as propriedades que o Github te possibilita usar dentro da sua aplicação, como `repos_url, id, description...`

O retorno dessa função callback é salva no banco de dados, então se você tentar salvar `repos_amount` por exemplo, sem ter essa coluna na tabela de User, essa informação será perdida.

Para recuperar essas informações no client, você precisa de alguma forma passar elas para a session, e o next auth possui uma função callback do session que possui por padrão um objeto que você pode desestruturar em `{ session, token, user }`, e o retorno dessa função, vira o session que você terá no client.

Para passar uma propriedade especifica agora é facil, basta pegar ela do user e jogar dentro do session e retornar o session, segue o exemplo:

```tsx
  callbacks: {
    session({ session, user }) {
      const newSession = {
        ...session,
        user: {
          ...session.user,
          repos_amount: user.repos_amount,
        },
      }
      return newSession
    },
  },

  /**
   * Nesse caso, eu estou pegando repos_amount que é uma propriedade do
   * provider que criei dentro do profile, e estou passando para o client.
  */
```

## Erro Unauthorized 401 fazendo chamadas dentro do authorize

Um dos motivos era porque a minha api estava lançando erros sem ser pegos em lugar algum, eu imaginei que dentro de um bloco try catch, lançando um erro dentro do try ele seria capturado pelo catch, mas estava enganado.

## Target Container is not a DOM Element quando usado createPortal e Radix

Aparentemente document ainda não foi criado no primeiro ciclo de vida do componente, então o portal não consegue encontrar a div por meio dos métodos do document de encontro de elemento.

A solução é criar o portal de forma condicional, enquanto document não está disponível, mostrar null, e isso pode ser feito com useEffect.

```tsx
export function MakeBidButton() {
  const [hasDocument, setHasDocument] = React.useState(false)

  React.useEffect(() => {
    setHasDocument(true)
  })

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>// elemento trigger com asChild</Dialog.Trigger>
      {hasDocument
        ? ReactDOM.createPortal(
            <Dialog.Content>
              <Dialog.Overlay className="w-screen h-screen inset-0 bg-black/40" />
              // elemento a ser mostrado
            </Dialog.Content>,
            document.getElementById("portal")!
          )
        : null}
    </Dialog.Root>
  )
}
```

> Importante o uso do asChild no elemento Trigger, para que ele use o próprio elemento como trigger, caso não seja usado, o javascript dele, quando carregado, criará um button por volta do seu elemento, e isso dará incompatibilidade com o HTML enviado pelo server e o HTML que está presente no código, porque agora possui um botão a mais
