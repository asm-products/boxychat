VAGRANTFILE_API_VERSION = '2'
name = 'BoxyChat'
box = 'trusty64'
box_url = 'https://cloud-images.ubuntu.com/vagrant/trusty/current/trusty-server-cloudimg-amd64-vagrant-disk1.box'
ip = '192.168.100.100'

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = box
  config.vm.box_url = box_url
  config.vm.hostname = "local.#{name}"
  config.vm.network :private_network, ip: ip

  config.vm.provider :virtualbox do |vb|
    vb.name = name
    vb.customize ["modifyvm", :id, "--memory", "512"]
  end

  config.vm.synced_folder(
      './',
      "/home/vagrant/boxychat",
      owner: 'vagrant',
      mount_options: ['dmode=775']
  )

  config.vm.provision :shell, :inline => "sudo apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10"
  config.vm.provision :shell, :inline => "sudo echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/10gen.list"
  config.vm.provision :shell, :inline => "sudo apt-get -y update"
  config.vm.provision :shell, :inline => "sudo apt-get install -y python-software-properties"
  config.vm.provision :shell, :inline => "sudo apt-get install -y vim git subversion curl"
  config.vm.provision :shell, :inline => "sudo apt-get install -y memcached build-essential"
  config.vm.provision :shell, :inline => "sudo add-apt-repository -y ppa:chris-lea/node.js"
  config.vm.provision :shell, :inline => "sudo apt-get -y update"
  config.vm.provision :shell, :inline => "sudo apt-get install -y nodejs"
  config.vm.provision :shell, :inline => "sudo apt-get install -y mongodb-10gen"

end