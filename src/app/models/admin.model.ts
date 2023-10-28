
export class Admin{

  constructor(
   public nombres :string,
    public apellidos :string,
   public email:string,
   public password?:string,
   public telefono?:string,
   public informe?:string,
   public rol?:'admin' | 'cliente',//tipos de role
   public dni?:string,
   public uid?:string,
  ){

  }
}
