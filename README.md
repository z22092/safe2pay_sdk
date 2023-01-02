# Safe2Pay SDK (nodejs / deno / bun.js) -> W.I.P.

  - 0 dependencias
  - typescript friendly
  - compativel com nodejs (>=10) / deno ( >= 1.29.1) / bun.js (0.4.0)

## Principais recursos

* [x] Consulta de transações.
* [x] Tokenização de cartão.
* [x] Pagamentos.
	* [x] Boleto bancário.
	* [x] Cartão de crédito.
	* [x] Bitcoin.
	* [x] Carnê.
	* [x] Lote de Carnês.

## Instalação


```bash
npm i safe2pay_sdk
yarn add safe2pay_sdk
pnpm add safe2pay_sdk
bun add safe2pay_sdk
```

## Utilização

A integração com a API do Safe2Pay se dá pelo modelo RESTful, de forma a realizar a transferência segura e simplificada dos dados pelo formato JSON. Para facilitar o envio dos dados, deve-se montar um objeto para envio baseado nos modelos disponíveis, com exemplos abaixo, e a própria chamada do método desejado realizará o tratamento e conversão deste objeto para JSON.

#### Exemplo

* import { createSafe2pay } from 'safe2pay_sdk'
* const apiClient = createSafe2pay(TOKEN)

Após a importação da biblioteca para utilizar basta utilizar o comando 'apiClient' e utilizar o módulo desejado.

As APIs do inclusas na SDK são:
- Carnet
- Payments (boleto, creditCard, cryptocurrency, pix)
- Tokenization
- Transaction



## Pagamentos / Transações


### Consultar transação



```typescript
import { createSafe2Pay } from  'safe2pay_sdk';
const { consultTransaction } =  createSafe2pay('key');

consultTransaction({
	params: {
		Id:  848906
	}
}).then((result) => {
	//...
	}).catch((error) {
	//...
});

```


### Tokenizando um cartão



```typescript
import { createSafe2Pay } from  'safe2pay_sdk';
const { createToken } =  createSafe2pay('key');

createToken({
	data: {
			IsSandbox:  false,
			CardNumber:  '44654654654654564',
			Holder:  'JOÂO DA SILVA SAURO',
			ExpirationDate:  '20/1990',
			SecurityCode:  '222'
		}
}).then((result) => {
	//...
	}).catch((error) {
	//...
});

```


### Criando uma venda com Boleto



```typescript
import { createSafe2pay, CodeTaxTypeEnum, CodeReceiverTypeEnum, DiscountTypeEnum } from  'safe2pay_sdk';

const { createBoleto } =  createSafe2pay('key');

createBoleto({
	data: {
		IsSandbox:  false,
		IpAddress:  '',
		Application:  '',
		Vendor:  '',
		CallbackUrl:  '',
		Reference:  '',
		Meta: {
			bla:  'lol'
		},
		Customer: {
			Identity:  '456465456465'
		},
		Products: [
			{
				Code:  '3333',
				Description:  'string',
				UnitPrice:  111,
				Quantity:  1
			}
		],
		Splits: [
			{
				CodeTaxType:  CodeTaxTypeEnum.FIXED,
				CodeReceiverType:  CodeReceiverTypeEnum.COMPANY,
				IdReceiver:  10,
				Identity:  '651651651561',
				Name:  'jão mingal',
				IsPayTax:  true,
				Amount:  222
			}
		],
		PaymentObject: {
			DueDate:  '20/12/2066',
			Instruction:  '',
			Message: ['Mensagem 1', 'Mensagem 2', 'Mensagem 3'],
			PenaltyRate:  10,
			InterestRate:  50,
			CancelAfterDue:  true,
			DaysBeforeCancel:  6,
			IsEnablePartialPayment:  false,
			DiscountAmount:  10,
			DiscountType:  DiscountTypeEnum.FIXED,
			DiscountDue:  '19/12/2066'
		}
	}
});
```

## TODO ->
* [x] Tipagem de todos os metodos.
* [ ] Criar documentação detalhada.
* [ ] Teste unitario.
