# Tutorial

> 全然わからない。俺たちは雰囲気で warriorsbot 開発をやっている。

## warriorsbot にコマンドを追加する

ここでは、例として「/ping」と投稿すると warriorsbot が「pong!」と返事を返すコマンドを作成します。

コマンドを作る上では、大きく分けて「router」と「handler」が関係してきます。

### router

router は `src/routers/index.ts` にあります。

router は簡単に言うと「どのメッセージの処理をどの handler に任せるか」の責務を担います。
handler については後述しますが、「どのような処理を行うか」までに router が関与するのは不適切です。

今回の例では「 '/ping' という投稿に対して」という条件でメッセージに対して返信を処理しますので、つまり「 '/ping' という投稿の処理を 'pong!' という返事を返す handler に任せる」といった文脈になります。

router は、処理の対象となる Message オブジェクトを handler へ引き渡します

```typescript
// src/router/index.ts

export namespace Router {
  export function MessageRouter(msg: Message) {
    // 投稿の本文が '/ping' で始まる場合、pingHandlerを呼び出す
    if (msg.content.startsWith("/ping")) {
      Handler.pingHandler(msg);
    }
  }
}
```

実際に処理を行う「 pingHandler 」については事項で実装します。

### handler

handler はメッセージに対する実際の処理を担います。
メッセージの処理とは、時と場合により「返信を返す」や「音声を再生する」だったり、なにか別の処理だったりするかもしれません。
handler は router から呼び出されますので、呼び出し可能な function として定義します。

今回の例では「 'pong!' という返信を返す」という処理を行いますので、これをそのまま handler に実装します。

```typescript
// src/handler/index.ts

export namespace Handler {
  // msg:
  export function pingHandler(msg: Message) {
    // routerから引き渡されたMessageオブジェクトに対して返信する
    msg.reply("pong!");
  }
}
```

## 動作確認

warriorsサーバーの任意のチャンネルで「/ping」と投稿すると、warriorsbotから「pong!」と返信が帰ってくることを確認しましょう。
誰かが開発用サーバーを起動していれば複数のbotから返事があるかもしれません。

以上でwarriorsbotにコマンドを追加できました。
このチュートリアルでは簡易的にwarriorsbotにコマンドを追加しましたが、実際には「複雑なロジックをモデル化して実装する」などの工夫が必要です。
また、コマンドの実装に便利な「simpleCommand」「customCommand」などの仕組みがあります。

これらの仕組みが理解できたら、warriorsbotに便利なコマンドを自由に追加してみましょう。
