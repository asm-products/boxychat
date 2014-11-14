###Contributing
Our stack is Node.JS and MongoDB

You can run it locally or use [Vagrant](https://www.vagrantup.com/)

###Clone the repo
First of all you need to clone this repository if you did not do it yet.
```
git clone https://github.com/asm-products/boxychat.git
cd boxychat
```
###Run BoxyChat with Vagrant

You need to start Vagrant, it will download and install everything that is needed.
```
vagrant up

```
Once the machine is ready you can jump in via SSH.
```
vagrant ssh

```
Vagrant will get the project's files and maps them to ```/home/vagrant/boxychat``` so you should enter that directory, install the packages and run the app.
```
cd boxychat
npm install
npm start

```

After this you can try boxychat at http://192.168.100.100:3000

###Run BoxyChat in local

All you need to do, you have Node.JS and MongoDB installed in local is the following
```
npm install
npm start

```

Now your app should be running at http://localhost:3000

## Contributing
First of all you have to fork the original repository  https://github.com/asm-products/boxychat.git .

This project's git flow is based on [A successful Git branching model](http://nvie.com/posts/a-successful-git-branching-model/)

1. Find or Submit Bounty
2. Make a Feature Branch from `develop`
  - Name it based on bounty: `18-init-project`
3. Make Changes
  - Use micro commits
  - Use the imperative, present tense: "change", not "changed" or "changes".
4. Write tests
  - Will not accept PRs that reduce coverage
5. Open PR back into develop
  - Make PR Description links to the Bounty and add a comment to the Bounty linking the PR

If you need to "resync" your fork with the original repository here you can find how to do it: https://help.github.com/articles/syncing-a-fork/