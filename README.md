# AquaDev

Une application pour découvrir les poissons de l'aquarium de Trégastel.

Prenez en photo les QR codes pour découvrir de nombreuses espèces aux particularités inhabituelles et gagnez des récompenses.

## Lancer l'instance de DEV

Ces instructions vous permettrons de mettre en place le projet en mode **DEV**.
Pour mettre le projet en **PRODUCTION**, référez vous à la partie [Déployer](#deployer)

### Pré-requis

Les pré-requis pour ce projet sont peu nombreux.

Voici ce qu'il vous faut :

- **GIT** : <https://git-scm.com/>
- **NodeJs** (version 20 minimum) : <https://nodejs.org/fr>

### Installation

L'installation est simple, suivez simplement ces commandes:

1. _Récupération du projet sur git_

   ```bash
   git clone https://github.com/LauraR40/Fishdex aquadev
   ```

2. _Installation des dépendances_

   ```bash
   cd aquadev
   npm -i
   ```

3. _Lancer le serveur_
   On peut lancer le serveur de plusieurs façons :

   - en local (inaccessible autre part que sur la machine)

   ```bash
   npm run dev
   ```

   - sur le réseau courant (accessible depuis tout équipement connecté au même réseau)

   ```bash
   npm run net
   ```

## Deployer

Pour déployer le projet sur un serveur en production il est conseiller de disposer d'un serveur **Linux**.

L'installation est la même que [précédemment](#installation). Seul le lancement diffère.

### Lancement simple

Pour lancer le serveur, il faut le compiler à l'aide de la commande

```bash
npm run build
```

Cela générera un dossier `build` dans le dossier du projet. Vous pourrez ensuite faire

```bash
node ./build
```

Et le serveur sera lancé. Cependant il y a de nombreux inconvénients.

- Le serveur se coupera si le terminal auquel il est rattaché est arrété.
- Le serveur se coupera si la machine est redémarrée

Il est donc préférable d'utiliser un gestionnaire de service comme dans la partie suivante

### Lancement robuste

Il est conseillé de faire un `ReverseProxy` pour préfiltrer les requêtes HTTP / HTTPS.

Plus d'informations à ce sujet : <https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/>

Nous allons partir du principe que nous voulons publier le site avec un reverse proxy.
L'ip du serveur node sera alors `localhost:<port>` le port est configurable. Choissez ce que vous voulez, de préférence au dessus du nombre 9000.

Nous allons utiliser [PM2](https://pm2.keymetrics.io/) qui est un service de monitoring.

> [!NOTE]  
> Nous assumerons que `pm2` est installé

1. On se rend dans le dossier du projet

   ```bash
   cd aquadev
   ```

2. On build pour la première fois

   ```bash
   npm run build
   ```

3. On lance avec pm2 et node

   ```bash
   pm2 start --name "aquadev" "HOST='localhost' PORT='9000' node ./build"
   ```

   pm2 va s'occuper d'enregistrer les informations du serveur et d'en faire un service redémarrable

4. On sauvegarde la configuration de pm2 pour que le serveur se redémarre automatiquement

   ```bash
   pm2 save
   ```

Et voilà, votre serveur est prêt.

> [!TIP]
> Si vous faites des modifications au projet, vous devrez compiler à nouveau et relancer le serveur
> Pour vous/nous simplifier la vie, nous avons mis en place la commande `npm run host`
> qui s'occupe de recompiler le projet et de redémarrer l'instance du serveur

## Technologies utilisées

Pour créer ce projet nous avons utilisé :

- [HTML5QrCode](https://github.com/mebjas/html5-qrcode)
- [Supabase](https://supabase.com/)
- [Sveltekit](https://kit.svelte.dev/)
- [Svelte](https://svelte.dev/)

## Auteurs

### Développeurs

- Développeuse principale : **Laura Rocheteau** [github](https://github.com/LauraR40)
- Aide et Hébergement : **Iziram** [github](https://github.com/Iziram)

### Design — UX / UI et communication

- UI : **COPAU Lenny**
- Communication : **LE BRUN Vincent**
- UX : **LE GALL Emrys**
- Dessin : **NOUVEL Soanne**
- Stratégie : **SALAND Paul**
