# StockOficinas
Un sistema para que las oficinas externas envíen su pedido de stock mensual

Actualmente las oficinas envian su pedido de stock vía mail en cualquier fecha. Lo que se plantea es que usuarios clave de cada oficina puedan logearse e ir cargando los insumos necesarios a lo largo del mes, luego se unifique como un solo pedido. Desde la oficina central se carga la compra y se actualiza el estado de lo que se va a comprar vs lo que se deja para un futuro.

Tambien se debe actualizar cuando la compra es enviada y recibida para tener un seguimiento.

Walter Pinto - Leg 99561

Endpoints:

Usuarios: ID ; Nombre ; Mail 

Oficinas: ID ; Nombre

Recursos ID ; Nombre

Stock: IdOficina ; IdRecurso ; Estado

Tips: 
1 - Siempre que aparece /recurso/id se entiende que el id es del recurso anteriormente expresado.\n
2 - Si aparece /recurso1/id/recurso2 el id corresponde al recurso1
3 - Si aparece /recurso1/id/recurso2/id el primer id corresponde al primer recurso y el segundo al
	segundo recurso.
4 - Estado puede tomar 4 valores. No hay CRUD para el mismo y cada uno tiene un ID 
	Pedido(11) -> Comprado(12) -> En transito(13) -> Recibido(14) -> Asignado(15)


                                                                                  
#                              USUARIOS /usuarios                                  
                                                                                  

REQUEST
	GET /usuarios
RESPONSE
		200 OK
		{Usuario: id;nombre;mail}
		{Usuario: id;nombre;mail}
		{Usuario: id;nombre;mail}
		"links":{"rel": "Usuarios","uri": "/usuarios/id"} 
		
**************************************************************************************

REQUEST
	GET /usuarios/{id}
RESPONSE
		200 OK
		{Usuario: id;nombre;mail}
		"links":{"rel": "Oficina","uri": "/oficinas/usuarios/id"}
RESPONSE
		404 Not Found
		"links":{"rel": "Usuarios","uri": "/usuarios"}
		
**************************************************************************************

REQUEST
	POST /usuarios
	{nombre;mail}
RESPONSE
	201 Created
	"links":{"rel": "Usuario","uri": "/usuarios/id"}

**************************************************************************************

REQUEST
	PATCH /usuarios/{id}
	{nombre;mail}
RESPONSE
	201 Created
	"links":{"rel": "Usuario","uri": "/usuarios/id"}

**************************************************************************************

REQUEST
	DELETE /usuarios
RESPONSE
	403 Forbidden

**************************************************************************************

REQUEST
	DELETE /usuarios/{id}
RESPONSE
	200 OK
	"links":{"rel": "Usuario","uri": "/usuarios"}


                                                                                  
#                              OFICINAS /oficinas                                  
                                                                                 


REQUEST
	GET /oficinas
RESPONSE
		200 OK
		{Oficina: id;Nombre}
		{Oficina: id;Nombre}
		{Oficina: id;Nombre}
		"links":{"rel": "Oficina","uri": "/oficinas/{id}"}

**************************************************************************************

REQUEST
	GET /oficinas/{id}
RESPONSE
		200 OK
		{Oficina: id;nombre;idusuario;usuario}
		"links":{"rel": "Oficina","uri": "/oficinas/id/usuarios"} 
RESPONSE
		404 Not Found
		"links":{"rel": "Oficinas","uri": "/oficinas"}
		
**************************************************************************************

REQUEST
	POST /oficinas
	{nombre;idusuario}
RESPONSE
	201 Created
	"links":{"rel": "Usuario","uri": "/oficinas/id"}

**************************************************************************************

REQUEST
	PATCH /oficinas/{id}
	{nombre;idusuario}
RESPONSE
	201 Created
	"links":{"rel": "Oficina","uri": "/oficinas/id"}

**************************************************************************************

REQUEST
	DELETE /oficinas
RESPONSE
	403 Forbidden

**************************************************************************************

REQUEST
	DELETE /oficinas/{id}
RESPONSE
	200 OK
	"links":{"rel": "Oficinas","uri": "/oficinas"}


                                                                                  
##                                 RECURSOS /recursos                               
                                                                                  


REQUEST
	GET /recursos
RESPONSE
		200 OK
		{Recurso: id;Nombre}
		{Recurso: id;Nombre}
		{Recurso: id;Nombre}
		"links":{"rel": "Recurso","uri": "/recursos/{id}"}

**************************************************************************************

REQUEST
	GET /recursos/{id}
RESPONSE
		200 OK
		{Recurso: id;nombre} 
RESPONSE
		404 Not Found
		"links":{"rel": "Recurso","uri": "/recursos"}
		
**************************************************************************************

REQUEST
	POST /recursos
	{nombre}
RESPONSE
	201 Created
	"links":{"rel": "Recurso","uri": "/recursos/id"}

**************************************************************************************

REQUEST
	PATCH /recursos/{id}
	{nombre}
RESPONSE
	201 Created
	"links":{"rel": "Recurso","uri": "/recursos/id"}

**************************************************************************************

REQUEST
	DELETE /recursos
RESPONSE
	403 Forbidden

**************************************************************************************

REQUEST
	DELETE /recursos/{id}
RESPONSE
	200 OK
	"links":{"rel": "Recurso","uri": "/recursos"}


                                                                                  
##                                 STOCK /stocks                                    
                                                                                  


REQUEST
	GET /stocks
RESPONSE
		200 OK
		{Stock: id;idoficina;oficina;idrecurso;recurso;estado}
		{Stock: id;idoficina;oficina;idrecurso;recurso;estado}
		{Stock: id;idoficina;oficina;idrecurso;recurso;estado}
		"links":{"rel": "Recurso","uri": "/stocks/{id}"}

**************************************************************************************

REQUEST
	GET /stocks/{id}
RESPONSE
		200 OK
		{Stock: id;idoficina;oficina;idrecurso;recurso;estado}
		"links":{"rel": "Recurso","uri": "/stocks/{id}"}
                {"rel": "Recurso","uri": "/stocks/{id}/oficinas"}
				{"rel": "Recurso","uri": "/stocks/{id}/estado"}
				{"rel": "Recurso","uri": "/stocks/{id}/recursos"}
				{"rel": "Recurso","uri": "/stocks/{id}/oficinas/"}
RESPONSE
		404 Not Found
		"links":{"rel": "Stock","uri": "/stocks"}
		
**************************************************************************************

REQUEST
	POST /stocks
	{oficina;recurso}
RESPONSE
	201 Created
	"links":{"rel": "Stock","uri": "/stocks/id"}

**************************************************************************************

REQUEST
	PATCH /stocks/{id}
	{recurso;estado}
RESPONSE
	201 Created
	"links":{"rel": "Stock","uri": "/stocks/id"}

**************************************************************************************

REQUEST
	PATCH /stocks/oficinas/{id}
	{recurso;estado}
RESPONSE
	201 Created
	"links":{"rel": "Stock","uri": "/stocks/id"}

**************************************************************************************

REQUEST
	DELETE /stocks
RESPONSE
	403 Forbidden

**************************************************************************************

REQUEST
	DELETE /stocks/{id}
RESPONSE
	200 OK
	"links":{"rel": "Stock","uri": "/stocks"}

**************************************************************************************

REQUEST
	DELETE /stocks/oficinas/{id}
RESPONSE
	200 OK
	"links":{"rel": "Stock","uri": "/stocks"}

