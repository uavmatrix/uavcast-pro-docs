# Funções e permissões

> A matriz exata de permissões das funções Owner, Admin e Viewer do Fleet Manager: pareamento, comandos de voo, terminal, missões, VPN e equipe.

O Fleet Manager tem três funções, definidas por organização. Uma pessoa pode ser Admin em uma organização e Viewer em outra.

| Função | Em resumo |
| --- | --- |
| **Owner** | Tudo o que um Admin pode fazer, além de excluir a organização e transferir a propriedade. Exatamente um por organização: a pessoa que a criou, ou aquela para quem a propriedade foi transferida. |
| **Admin** | Administra a frota: pareia e remove drones, envia comandos, abre o terminal, planeja e envia missões, gerencia a VPN e as vinculações de fluxo, e gerencia a equipe. |
| **Viewer** | Somente leitura. Vê o painel, a frota, o mapa ao vivo, o histórico de voos, as missões, a rede e a equipe, mas não pode alterar nem comandar nada. |

Novos membros são convidados como Admin ou Viewer. A função Owner só muda de mãos por meio de [Transfer Ownership](https://docs.uavmatrix.com/pt/fleet-manager/team/#transfer-ownership).

## Matriz de permissões

A matriz vem das regras de permissão que o Fleet Manager aplica no servidor, então um botão oculto nunca é a única barreira.

| Ação | Owner | Admin | Viewer |
| --- | --- | --- | --- |
| **Frota e drones** |  |  |  |
| Ver o painel, a lista da frota, as páginas dos UAVs e o mapa ao vivo | ✓ | ✓ | ✓ |
| Assistir à reprodução do histórico de voos | ✓ | ✓ | ✓ |
| Salvar, renomear e excluir voos nomeados | ✓ | ✓ | – |
| Parear um drone (**Pair Device**) | ✓ | ✓ | – |
| Renomear um drone, alterar a cor dele no mapa | ✓ | ✓ | – |
| Remover um drone | ✓ | ✓ | – |
| **Comandos** |  |  |  |
| Alterar o modo de voo, RTL, Loiter, Circle | ✓ | ✓ | – |
| Armar, desarmar, armar à força | ✓ | ✓ | – |
| Calibração pré-voo | ✓ | ✓ | – |
| Iniciar, parar e ler missões em um drone | ✓ | ✓ | – |
| Reiniciar ou desligar o computador companheiro | ✓ | ✓ | – |
| **Terminal** SSH na página do UAV | ✓ | ✓ | – |
| **Open via Proxy** (interface web do UAVcast-Pro por meio do Fleet Manager) | ✓ | ✓ | – |
| **Missões** |  |  |  |
| Ver missões salvas | ✓ | ✓ | ✓ |
| Criar, editar e excluir missões | ✓ | ✓ | – |
| **Upload to Drone** | ✓ | ✓ | – |
| **Rede e VPN** |  |  |  |
| Ver a página Network, os dispositivos e as vinculações de fluxo | ✓ | ✓ | ✓ |
| Ver a chave de autenticação da VPN e o **GCS Connection Command** | ✓ | ✓ | – |
| Habilitar a VPN, gerar chaves de autenticação, **Push to Drone** | ✓ | ✓ | – |
| Renomear, alterar o tipo ou remover dispositivos da VPN | ✓ | ✓ | – |
| Adicionar, pausar ou remover vinculações de fluxo | ✓ | ✓ | – |
| Excluir a rede VPN | ✓ | ✓ | – |
| **Equipe** |  |  |  |
| Ver membros e funções | ✓ | ✓ | ✓ |
| Convidar membros (como Admin ou Viewer) | ✓ | ✓ | – |
| Alterar a função de um membro (exceto a do Owner) | ✓ | ✓ | – |
| Remover membros (exceto o Owner), revogar convites | ✓ | ✓ | – |
| Transferir a propriedade | ✓ | – | – |
| **Organização e configurações** |  |  |  |
| Renomear a organização, editar a descrição | ✓ | ✓ | – |
| Alterar a retenção de telemetria, limpar ou excluir o histórico | ✓ | ✓ | – |
| Excluir a organização | ✓ | – | – |
| **Todos** |  |  |  |
| Usar o FleetBot, criar e fechar os próprios tickets de suporte | ✓ | ✓ | ✓ |
| Editar o próprio perfil (na conta UAVmatrix) | ✓ | ✓ | ✓ |

> **Admins podem gerenciar outros Admins**
>
> Um Admin pode convidar novos Admins, rebaixar outro Admin para Viewer e remover outros Admins. Atribua a função Admin apenas a pessoas em quem você confiaria com toda a frota. O Owner é o único membro que um Admin não pode alterar.

> **O que os Viewers veem**
>
> Os Viewers têm acesso às mesmas páginas, sem os controles. O painel de controle do UAV mostra ao Viewer o status ao vivo e os registros, mas não os botões de modo de voo, missão ou armar, nem a aba Terminal. Em **Network**, os Viewers não veem a chave de autenticação da VPN: *Only Owners and Admins can see the VPN auth key.* O Fleet Manager também verifica cada comando no servidor, então um Viewer não consegue enviar um comando por outros meios.

## Como escolher funções para uma frota empresarial

| Pessoa | Função sugerida |
| --- | --- |
| Gerente de frota ou de operações | Owner (uma pessoa) |
| Pilotos, técnicos e quem pareia novas aeronaves | Admin |
| Clientes que acompanham o trabalho ao vivo, a gestão e auditores | Viewer |
| Terceirizados que precisam voar com seus drones | Admin, removido ao fim do trabalho |

## Não é uma função: super admin

A equipe da UAVmatrix tem uma função de suporte separada, em todas as organizações. Ela é usada para tarefas de suporte, como [adicionar e-mails extras de licença](https://docs.uavmatrix.com/pt/fleet-manager/licenses/#licenses-bought-with-another-email) a uma conta. Não faz parte da sua organização e não pode ser atribuída.

Source: https://docs.uavmatrix.com/pt/fleet-manager/team/roles-and-permissions/
