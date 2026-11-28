# Parear novamente, remover ou transferir um drone

> Pareie um drone novamente quando o Fleet Manager pedir, remova-o da sua organização, mova-o para outra ou substitua o computador companheiro.

Um drone pertence a uma organização de cada vez. Esta página trata das três ações que você faz com um drone existente: parear novamente, remover e mudá-lo de lugar.

## Parear um drone novamente

Parear novamente renova o certificado de conexão do drone. O drone mantém o seu registro no Fleet Manager: nome, histórico de telemetria, voos salvos e vinculações de fluxo continuam como estão.

Você precisa fazer isso quando:

- O Fleet Manager mostra **Re-pair required** no drone, ou o banner **This UAV must be re-paired** na página dele. O Fleet Manager passou a usar um certificado mais novo e mais rigoroso, e este drone ainda tem um antigo.
- Alguém selecionou **Disconnect from Fleet** no UAVcast-Pro.

![Página do UAV com o banner This UAV must be re-paired](https://docs.uavmatrix.com/pt/img/screenshots/fleet-manager/drone-detail--repair-required.webp)

*Página do UAV com o banner This UAV must be re-paired, explicando os passos Disconnect e Connect to Fleet Manager.*

1. Na interface do UAVcast-Pro do drone, abra **Fleet Management** e selecione **Disconnect from Fleet**. Confirme **Disconnect from Fleet?** Se a página já mostrar **Connect to Fleet Manager**, pule este passo.
2. Selecione **Connect to Fleet Manager** para obter um novo código de 8 dígitos.
3. No Fleet Manager, vá em **Fleet → Pair Device**, escolha a **mesma organização** e digite o código. Siga o assistente como em [Adicione seu primeiro drone](https://docs.uavmatrix.com/pt/fleet-manager/pair-uav/).

Não remova o drone no Fleet Manager antes. A remoção exclui o histórico; parear novamente o mantém.

## Remover um drone

Use isto quando um drone for aposentado, vendido ou transferido para outra organização. Somente Owners e Admins.

1. Abra a [página do UAV](https://docs.uavmatrix.com/pt/fleet-manager/fleet/uav-details/) do drone e selecione **Remove**.
2. Confirme **Delete UAV**.

Se o drone estiver online, o Fleet Manager primeiro pede ao UAVcast-Pro que o desparear e aguarda até 5 segundos por uma resposta. Então o UAVcast-Pro volta a mostrar **Connect to Fleet Manager** e sai da VPN da organização.

Se o drone estiver offline ou não responder, **UAVcast Not Responding** pergunta se você quer continuar. **Delete Anyway** remove o drone apenas do Fleet Manager. Depois, na próxima vez que você conseguir acessar o drone, selecione **Disconnect from Fleet** no UAVcast-Pro. Até lá, ele continua achando que está pareado.

![Diálogo de confirmação Delete UAV alertando que os dados de telemetria e o histórico de comandos serão removidos](https://docs.uavmatrix.com/pt/img/screenshots/fleet-manager/drone-detail--delete.webp)

*Diálogo Delete UAV para uma aeronave aposentada, avisando que todos os dados de telemetria e o histórico de comandos serão removidos permanentemente.*

### O que a remoção exclui

| Excluído | Mantido |
| --- | --- |
| O registro do drone e o seu nome | Entradas em **Recent Activity** |
| Toda a telemetria armazenada e o histórico de voos, inclusive voos salvos | Missões salvas (elas pertencem à organização) |
| Histórico de comandos e vinculações de fluxo | A licença do UAVcast-Pro, que continua ativada no drone |
| O dispositivo VPN do drone |  |

> **Isto não pode ser desfeito**
>
> Não há exportação do histórico de voos antes de remover um drone. Se você precisar desses dados, reproduza ou registre o que for necessário em [Histórico de voos](https://docs.uavmatrix.com/pt/fleet-manager/map/flight-history/) primeiro.

## Mover um drone para outra organização

O Fleet Manager não tem um botão de "transferir" para um drone individual, porque o histórico fica com a organização que o registrou. Para mover um drone:

1. Na organização atual, [remova o drone](https://docs.uavmatrix.com/pt/fleet-manager/fleet/remove-or-transfer/#remove-a-drone). O histórico dele ali será excluído.
2. Confirme que a licença do UAVcast-Pro do drone pertence a um membro da nova organização. Veja [Licenças](https://docs.uavmatrix.com/pt/fleet-manager/licenses/).
3. Na nova organização, [pareie o drone](https://docs.uavmatrix.com/pt/fleet-manager/pair-uav/).

Se você tentar parear um drone que ainda pertence a outra organização, o Fleet Manager para com a mensagem **This UAV is already paired to an organization**. Somente um Owner ou Admin dessa organização pode liberá-lo.

Para transferir uma **frota inteira** com o histórico (por exemplo, quando uma empresa é vendida), mantenha a organização e [transfira a propriedade](https://docs.uavmatrix.com/pt/fleet-manager/team/#transfer-ownership) para o novo dono.

## Substituir o computador companheiro

O Fleet Manager identifica um drone por um ID de dispositivo que o UAVcast-Pro calcula a partir do número de série da CPU do computador companheiro e do disco de inicialização (cartão SD ou SSD). Um novo computador companheiro, ou um novo cartão SD ou SSD no mesmo computador, aparece como um drone **novo**. Reinstalar o UAVcast-Pro na mesma placa e no mesmo disco mantém o mesmo ID de dispositivo.

1. Remova o drone antigo no Fleet Manager (ou mantenha-o até não precisar mais do histórico dele).
2. Instale o UAVcast-Pro no novo computador e ative a licença. Veja [Ative sua licença](https://docs.uavmatrix.com/pt/get-started/license-activation/).
3. Pareie-o como um drone novo e recrie as vinculações de fluxo.

Source: https://docs.uavmatrix.com/pt/fleet-manager/fleet/remove-or-transfer/
