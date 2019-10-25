new Vue({
    el: '#app',
    data: {
        tarefa: '',
        tarefasFeitas: JSON.parse(window.localStorage.getItem('tarefas-feitas')),
        tarefasNaoFeitas: JSON.parse(window.localStorage.getItem('tarefas-nao-feitas')),
    },
    computed: {
        temTarefaFeita() {
            return this.tarefasFeitas !== null && this.tarefasFeitas.length > 0;
        },
        temTarefaNaoFeita() {
            return this.tarefasNaoFeitas !== null && this.tarefasNaoFeitas.length > 0;
        },
    },
    methods: {
        addTarefa() {
            var obj = {
                texto: this.tarefa,
            };
            if(this.tarefasNaoFeitas === null) {
                this.tarefasNaoFeitas = [];
            }
            this.tarefasNaoFeitas.push(obj);
            window.localStorage.setItem('tarefas-nao-feitas', JSON.stringify(this.tarefasNaoFeitas));                    
            this.tarefa = '';
        },
        tarefaFeita(index) {
            if(this.tarefasFeitas === null) {
                this.tarefasFeitas = [];
            }
            this.tarefasFeitas.push(this.tarefasNaoFeitas[index]);
            this.tarefasNaoFeitas = this.tarefasNaoFeitas.filter(
                (item, i) => {
                    return i !== index;
                }
            );
            this.saveTarefas();                    
        },
        tarefaNaoFeita(index) {
            this.tarefasNaoFeitas.push(this.tarefasFeitas[index]);
            this.tarefasFeitas = this.tarefasFeitas.filter(
                (item, i) => {
                    return i !== index;
                }
            );
            this.saveTarefas();
        },
        saveTarefas() {
            window.localStorage.setItem('tarefas-nao-feitas', JSON.stringify(this.tarefasNaoFeitas));
            window.localStorage.setItem('tarefas-feitas', JSON.stringify(this.tarefasFeitas));
        },
        deletar(index) {},
    }
});