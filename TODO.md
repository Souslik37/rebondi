# TODO : informations à compléter

Tout ce qui apparaît sur le site entre [CROCHETS] et surligné en jaune est listé ici.
`npm run todo` (lancé aussi à chaque `npm run build`) vérifie qu'aucun placeholder n'est oublié.

## À compléter

- [ ] [E-MAIL] : adresse de contact → `src/data/site.json` (`contact.email`), mentions légales, confidentialité
- [ ] [PHOTO D'ALEX] : remplacer `src/assets/site/alex.jpg` (carré, ≥ 900 px), puis retirer `[PHOTO D'ALEX]` de `photoAlt` dans `src/data/ui.fr.json`

## À vérifier avant la mise en ligne

- [ ] Payconiq : si tu n'as pas de QR code, retirer « ou par QR code (Payconiq) » de `site.json` (`paymentNote`), de la FAQ et des conditions
- [ ] Caution de 200 € : confirmer le montant (FAQ + conditions, article 6)
- [ ] Adresse du dépôt de Genval confirmée avec l'ami qui stocke les châteaux
- [ ] Autorisation de JB Gonflables pour utiliser leurs photos produits (à remplacer par tes propres photos dès que possible)
- [ ] Assurance responsabilité civile pour l'activité (rien n'est annoncé sur le site pour l'instant)
- [ ] Image de partage `public/og-default.jpg` (1200 × 630 px)
- [ ] Nom de domaine à choisir (rebondi.be ou chateaugonflable.be) ; ensuite `url` = le domaine et `basePath` vide dans `site.json`
