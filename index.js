
let url = 'http://localhost:3000/users';


class AirDnd {
    constructor() {
        this.users = []
        this.url = 'http://localhost:3000'
        this.fetchUsers();
    }

    async fetchUsers() {
       let res = await fetch(`${this.url}/users`)
       let data = await res.json();
       this.users = data;
       this.renderUserCards();
    }

    async deleteUser(userId) {
        try {
            let res = await fetch(`${this.url}/${userId}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                // Remove the user 
                this.users = this.users.filter(user => user.id !== userId);
                this.renderUserCards();
            } else {
                console.error('Error deleting user:', res.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    renderUserCards() {
        let container = document.getElementById('users')
        container.innerHTML = '';

        for (let user of this.users) {
            //creating my cards
            let card = document.createElement('div')
            let pic = document.createElement('img');
            let info = document.createElement('h3')
            let deleteButton = document.createElement('button'); //this is my delete button

            //modifying 
            let verified = user.isVerified ? '✅' : '';
            pic.src = user.pic;
            
            info.innerText = `${user.location} - $${user.pricePerDay}/day ${verified}`
            pic.setAttribute(`class`, `userPic`)
            card.setAttribute('class','card')


            // Setting up the delete button
            deleteButton.innerText = 'Delete';
            deleteButton.onclick = () => this.deleteUser(user.id); 


            //append
            card.append(pic, info, deleteButton)
            container.append(card)
        }
    }


} 


// want to see each users (all airdnd options)

let airDnd = new AirDnd(); 