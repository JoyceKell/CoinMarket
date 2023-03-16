# Indexador de Criptoativos

Este é um projeto para criar um indexador de criptoativos semelhante ao CoinMarketCap. O objetivo é fornecer aos usuários uma lista de criptomoedas com detalhes como nome, símbolo, preço, capitalização de mercado e volume nas últimas 24 horas. Os dados são obtidos por meio da API CoinCap 2.0.

## Tecnologias Utilizadas

O projeto foi desenvolvido em Nuxt.js, um framework baseado em Vue.js que permite criar aplicativos da web de página única (SPA) e aplicativos da web de várias páginas (MPA). A escolha desta tecnologia se deu pela facilidade de uso e pela possibilidade de criação de aplicações rápidas e eficientes.

Para a estilização da aplicação, foi utilizado o framework de CSS Tailwind, que fornece uma ampla variedade de utilitários de estilo pré-construídos para ajudar na criação de designs responsivos e personalizados.

## Views

O projeto contém quatro views:

### Lista de Criptoativos

Essa é a view inicial do site, que apresenta uma lista de todos os criptoativos e alguns detalhes sobre cada um. Cada criptoativo tem um link para a respectiva view "Criptoativo Individual".

### Criptoativo Individual

Essa view apresenta uma lista de todas as exchanges que possuem um mercado para um determinado ativo. Além das informações apresentadas na view anterior "Lista de Criptoativos", ela também inclui informações úteis, como os mercados onde o ativo tem o preço mais baixo e mais elevado, e a diferença percentual entre esses dois preços.

### Valores Agregados do Mercado

Essa view utiliza as informações da view "Lista de Criptoativos" para mostrar as informações de forma agregada (a soma de todos os valores). Alguns exemplos de informações incluem o número de ativos, o número de ativos com capitalização de mercado superior a $10 bilhões, supply agregado, capitalização de mercado agregado e diferença percentual em 24 horas agregada.

### Conversor de Moeda

Essa view permite selecionar um montante e duas moedas (moeda doméstica/estrangeira) e calcular a conversão da moeda 1 para a moeda 2. Por exemplo: se o usuário quiser saber quantos euros (EUR) valem 1 bitcoin (BTC), ele seleciona BTC como moeda 1 e EUR como moeda 2. A API fornecerá o price_usd do ativo BTC e o price_usd do ativo EUR, permitindo que o price_eur de 1 BTC seja calculado usando a fórmula:

price_eur = amount_btc \* price_usd_btc / price_usd_eu

## Acesse pelo Vercel

Acesse: https://coin-market-beige.vercel.app/

## Instalação

Instale as dependências do backend com Npm e do frontend com Yarn

```bash
  git clone https://github.com/JoyceKell/CoinMarket.git
  yarn
```

Depois de instalar as dependências, inicie o servidor de desenvolvimento:

```bash
  yarn dev
```

Abra um navegador e acesse o endereço http://localhost:3000 para visualizar o projeto.
