routes :
GET /articles : Cette route permet de récupérer tous les articles de la base de données.
GET /articles/:id : Cette route permet de récupérer un article spécifique en fonction de son ID.
POST /articles : Cette route permet de créer un nouvel article. Elle est protégée par un middleware d'authentification, donc seul un utilisateur authentifié peut l'utiliser.
PUT /articles/:id : Cette route permet de mettre à jour un article spécifique en fonction de son ID. Elle est également protégée par un middleware d'authentification.
DELETE /articles/:id : Cette route permet de supprimer un article spécifique en fonction de son ID. Elle est protégée par un middleware d'authentification.