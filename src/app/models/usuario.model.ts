export class Usuario {

    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        public imagen?: string,
        public rol?: string,
        public google_auth?: string,
        public pk_usuario?: string
    ) { }
}
