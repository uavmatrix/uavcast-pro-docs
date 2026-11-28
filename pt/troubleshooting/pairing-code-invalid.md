# Código de pareamento inválido ou expirado

> Corrija os erros Invalid pairing code, This pairing code has expired e License is not owned by any member of this organization ao parear um UAV com o Fleet Manager.

Você digitou o código do UAVcast-Pro no assistente **Pair Device** do Fleet Manager, e ele foi recusado.

O pareamento funciona nesta direção: **o UAVcast-Pro mostra o código, e você o digita no Fleet Manager**. O código tem 8 dígitos e é válido por 5 minutos.

![Assistente Pair UAV do Fleet Manager com a notificação de erro This pairing code has expired](https://docs.uavmatrix.com/pt/img/screenshots/fleet-manager/pair-device--code-expired.webp)

*O Fleet Manager recusando um código: o erro aparece como notificação na etapa Pairing Code, aqui This pairing code has expired.*

| Erro no Fleet Manager | Causa | Correção |
| --- | --- | --- |
| **Pairing code must be 8 digits** / **Please enter a valid 8-digit code** | Poucos dígitos, ou letras | [Verificação 1](https://docs.uavmatrix.com/pt/troubleshooting/pairing-code-invalid/#check-1) |
| **Invalid pairing code** | Um erro de digitação, ou um código que nunca existiu | [Verificação 1](https://docs.uavmatrix.com/pt/troubleshooting/pairing-code-invalid/#check-1) |
| **This pairing code has expired** | Mais de 5 minutos se passaram | [Verificação 2](https://docs.uavmatrix.com/pt/troubleshooting/pairing-code-invalid/#check-2) |
| **This pairing code has already been used** | O código já foi usado uma vez | [Verificação 2](https://docs.uavmatrix.com/pt/troubleshooting/pairing-code-invalid/#check-2) |
| **License is not owned by any member of this organization** | A licença do drone pertence a uma conta fora da organização | [Verificação 3](https://docs.uavmatrix.com/pt/troubleshooting/pairing-code-invalid/#check-3) |
| **Invalid license key** / **License has expired** / **License has been refunded** | A licença do drone não é válida na loja | [Verificação 4](https://docs.uavmatrix.com/pt/troubleshooting/pairing-code-invalid/#check-4) |
| **This UAV is already paired to an organization** | Já pareado a outra organização | [Verificação 5](https://docs.uavmatrix.com/pt/troubleshooting/pairing-code-invalid/#check-5) |
| **Too many attempts. Please wait a minute and try again.** | Limite de tentativas após várias tentativas seguidas | Aguarde um minuto |

## Verificação 1: digite o código atual

1. No UAVcast-Pro, vá para **Fleet Management** e pressione **Connect to Fleet Manager**.
2. Copie os 8 dígitos exibidos em **Pairing Code**.
3. No Fleet Manager, vá para **Fleet → Pair Device**, escolha a organização e digite o código em **Enter Pairing Code**.

## Verificação 2: obtenha um código novo

Um código é válido por 5 minutos e funciona uma única vez. Quando **Expires in** chegar a zero, pressione **Connect to Fleet Manager** de novo no UAVcast-Pro para obter um novo código. Se o UAVcast-Pro não conseguir obter código nenhum, ele mostra *Unable to connect to Fleet Manager. Please check your internet connection.*: corrija primeiro a internet do drone.

## Verificação 3: licença pertencente a alguém fora da organização

O Fleet Manager só aceita um drone cuja licença do UAVcast-Pro tenha sido comprada por um membro da organização em que você está fazendo o pareamento. A correspondência é feita pelo endereço de e-mail da conta da loja que é dona da licença.

Corrija de uma destas formas:

- Convide a conta que comprou a licença para a organização (**Team**) e faça o pareamento novamente.
- Faça o pareamento em uma organização em que o dono da licença seja membro.
- Se a licença foi comprada com outro endereço de e-mail seu, peça ao **[support@uavmatrix.com](mailto:support@uavmatrix.com)** para adicionar esse endereço como e-mail de licença no seu usuário do Fleet Manager.

Veja [Licenças no Fleet Manager](https://docs.uavmatrix.com/pt/fleet-manager/licenses/).

## Verificação 4: licença não válida

Abra **Aplicação → Gerenciador de Licença** no drone e verifique o **Status da Licença**. Uma licença expirada ou reembolsada precisa ser renovada em [uavmatrix.com](https://uavmatrix.com/). Se o próprio UAVcast-Pro não tiver licença ativa, ele não consegue solicitar um código (*No valid license found. Please activate your license first.*): veja [A licença não ativa](https://docs.uavmatrix.com/pt/troubleshooting/license-activation-failed/).

## Verificação 5: já pareado em outro lugar

Um UAV pertence a uma única organização. Para movê-lo, remova-o primeiro da organização antiga. Parear de novo na mesma organização é permitido e mantém o histórico do UAV. Veja [Remover ou transferir um UAV](https://docs.uavmatrix.com/pt/fleet-manager/fleet/remove-or-transfer/).

## Ainda recusado?

Envie o texto exato do erro, o nome de host do UAV e o nome da organização para **[support@uavmatrix.com](mailto:support@uavmatrix.com)**.

Relacionados: [Pareamento do Fleet Manager no UAVcast-Pro](https://docs.uavmatrix.com/pt/uavcast-pro/fleet-pairing/) · [Pareie seu primeiro UAV](https://docs.uavmatrix.com/pt/fleet-manager/pair-uav/)

Source: https://docs.uavmatrix.com/pt/troubleshooting/pairing-code-invalid/
