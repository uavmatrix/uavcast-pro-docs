# Riaccoppia, rimuovi o trasferisci un drone

> Riaccoppia un drone quando Fleet Manager lo richiede, rimuovilo dalla tua organizzazione, spostalo in un'altra oppure sostituisci il suo computer di bordo.

Un drone appartiene a una sola organizzazione alla volta. Questa pagina riguarda le tre operazioni che fai su un drone esistente: riaccoppiarlo, rimuoverlo e spostarlo altrove.

## Riaccoppia un drone

Il riaccoppiamento rinnova il certificato di connessione del drone. Il drone mantiene il suo record in Fleet Manager: nome, cronologia della telemetria, voli salvati e associazioni di flusso restano invariati.

Ti serve quando:

- Fleet Manager mostra **Re-pair required** sul drone, oppure il banner **This UAV must be re-paired** sulla sua pagina. Fleet Manager è passato a un certificato più recente e più restrittivo, e questo drone ne ha ancora uno vecchio.
- Qualcuno ha selezionato **Disconnect from Fleet** in UAVcast-Pro.

![Pagina UAV con il banner This UAV must be re-paired](https://docs.uavmatrix.com/it/img/screenshots/fleet-manager/drone-detail--repair-required.webp)

*Pagina UAV con il banner This UAV must be re-paired, che spiega i passaggi Disconnect e Connect to Fleet Manager.*

1. Nell'interfaccia UAVcast-Pro del drone apri **Fleet Management** e seleziona **Disconnect from Fleet**. Conferma **Disconnect from Fleet?** Se la pagina mostra già **Connect to Fleet Manager**, salta questo passaggio.
2. Seleziona **Connect to Fleet Manager** per ottenere un nuovo codice a 8 cifre.
3. In Fleet Manager vai su **Fleet → Pair Device**, scegli la **stessa organizzazione** e inserisci il codice. Segui la procedura guidata come in [Aggiungi il tuo primo drone](https://docs.uavmatrix.com/it/fleet-manager/pair-uav/).

Non rimuovere prima il drone in Fleet Manager. Rimuoverlo elimina la sua cronologia; riaccoppiarlo la mantiene.

## Rimuovi un drone

Usalo quando un drone viene ritirato, venduto o spostato in un'altra organizzazione. Solo Owner e Admin.

1. Apri la [pagina UAV](https://docs.uavmatrix.com/it/fleet-manager/fleet/uav-details/) del drone e seleziona **Remove**.
2. Conferma **Delete UAV**.

Se il drone è online, Fleet Manager dice prima a UAVcast-Pro di disaccoppiarsi e attende fino a 5 secondi una risposta. UAVcast-Pro mostra quindi di nuovo **Connect to Fleet Manager** e lascia la VPN dell'organizzazione.

Se il drone è offline o non risponde, **UAVcast Not Responding** chiede se continuare. **Delete Anyway** lo rimuove solo da Fleet Manager. Poi, la prossima volta che potrai raggiungere il drone, seleziona tu stesso **Disconnect from Fleet** in UAVcast-Pro. Fino ad allora il drone pensa ancora di essere accoppiato.

![Finestra di conferma Delete UAV che avverte che telemetria e cronologia dei comandi verranno rimosse](https://docs.uavmatrix.com/it/img/screenshots/fleet-manager/drone-detail--delete.webp)

*Finestra Delete UAV per un telaio ritirato, che avverte che tutti i dati di telemetria e la cronologia dei comandi saranno rimossi in modo permanente.*

### Cosa elimina la rimozione

| Eliminato | Mantenuto |
| --- | --- |
| Il record del drone e il suo nome | Voci in **Recent Activity** |
| Tutta la telemetria memorizzata e la cronologia dei voli, inclusi i voli salvati | Missioni salvate (appartengono all'organizzazione) |
| Cronologia dei comandi e associazioni di flusso | La licenza UAVcast-Pro, che resta attivata sul drone |
| Il dispositivo VPN del drone |  |

> **Non è reversibile**
>
> Non esiste un'esportazione della cronologia dei voli prima di rimuovere un drone. Se ti servono i dati, riproduci o registra ciò che ti serve dalla [Cronologia dei voli](https://docs.uavmatrix.com/it/fleet-manager/map/flight-history/) prima di procedere.

## Sposta un drone in un'altra organizzazione

Fleet Manager non ha un pulsante di "trasferimento" per un singolo drone, perché la cronologia resta con l'organizzazione che l'ha registrata. Per spostare un drone:

1. Nell'organizzazione attuale, [rimuovi il drone](https://docs.uavmatrix.com/it/fleet-manager/fleet/remove-or-transfer/#remove-a-drone). La sua cronologia lì viene eliminata.
2. Assicurati che la licenza UAVcast-Pro del drone sia di proprietà di un membro della nuova organizzazione. Vedi [Licenze](https://docs.uavmatrix.com/it/fleet-manager/licenses/).
3. Nella nuova organizzazione, [accoppia il drone](https://docs.uavmatrix.com/it/fleet-manager/pair-uav/).

Se provi ad accoppiare un drone che appartiene ancora a un'altra organizzazione, Fleet Manager si ferma con **This UAV is already paired to an organization**. Solo un Owner o un Admin di quell'organizzazione può liberarlo.

Per cedere un'**intera flotta** con la sua cronologia (ad esempio quando un'azienda viene venduta), mantieni l'organizzazione e [trasferisci la proprietà](https://docs.uavmatrix.com/it/fleet-manager/team/#transfer-ownership) al nuovo proprietario.

## Sostituisci il computer di bordo

Fleet Manager identifica un drone tramite un ID dispositivo che UAVcast-Pro calcola dal numero seriale della CPU del computer di bordo e dal disco di avvio (scheda SD o SSD). Un nuovo computer di bordo, oppure una nuova scheda SD o SSD sullo stesso computer, compare come drone **nuovo**. Reinstallare UAVcast-Pro sulla stessa scheda e sullo stesso disco mantiene lo stesso ID dispositivo.

1. Rimuovi il vecchio drone in Fleet Manager (oppure conservalo finché non ti serve più la sua cronologia).
2. Installa UAVcast-Pro sul nuovo computer e attiva la licenza. Vedi [Attiva la tua licenza](https://docs.uavmatrix.com/it/get-started/license-activation/).
3. Accoppialo come nuovo drone e ricrea le sue associazioni di flusso.

Source: https://docs.uavmatrix.com/it/fleet-manager/fleet/remove-or-transfer/
