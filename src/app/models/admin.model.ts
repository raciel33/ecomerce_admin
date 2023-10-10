
export class Admin{

  constructor(
   public nombre :string,
    public apellidos :string,
   public email:string,
   public password?:string,
   public telefono?:string,
   public informe?:string,
   public rol?:'admin' | 'user',//tipos de role
   public dni?:string,
   public uid?:string,
  ){

  }
}
