class UserController {

    constructor(formId, tableId){

        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);

        this.onSubmit();

    }//close constructor

    onSubmit() {

        this.formEl.addEventListener('submit', (e) => { //Arrow Function. Se for somente um parâmetro não é necessário os parenteses

            e.preventDefault();

            let values = this.getValues();

            this.getPhoto().then(

                (content) => {

                    values.photo = content;

                    this.addLine(values);
                },
                (e) => {

                    console.error(e);
                });
        });
    }//close method

    getPhoto() {

        return new Promise((resolve, reject) => {

            let fileReader = new FileReader();

            let elements = [...this.formEl.elements].filter(item => {
    
                if (item.name === 'photo'){
    
                    return item;
                }
            });
    
            let file = elements[0].files[0];
    
            fileReader.onload = ()=> {
    
                resolve(fileReader.result);
            };

            fileReader.onerror = (e) => {

                reject(e);
            };
    
            fileReader.readAsDataURL(file); 
        });

    }//close method

    getValues() {

        let user = {}; //JSON

        [...this.formEl.elements].forEach(function (field, index){//uso de Spread pra resolver o problema do forEach

            if(field.name == 'gender') {
        
                if(field.checked) {
        
                    user[field.name] = field.value;
                }
            } else {
        
                user[field.name] = field.value;
            }
        });
        
        return new User(
            user.name, 
            user.gender, 
            user.birth, 
            user.country, 
            user.email, 
            user.password, 
            user.photo, 
            user.admin
        );

    }//close method

    addLine(dataUser) {

        this.tableEl.innerHTML = `
            <tr>
                <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
                <td>${dataUser.name}</td>
                <td>${dataUser.email}</td>
                <td>${dataUser.admin}</td>
                <td>${dataUser.birth}</td>
                <td>
                <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
                </td>
            </tr>
        `;
    }//close method

}//close class