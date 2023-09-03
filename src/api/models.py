from flask sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(88), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    salt = db.Column(db.String(100), unique=False, nullable=False)
    avatar = db.Column(db.String(100), unique=False, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, nullable=False, onupdate=db.func.current_timestamp(), default=db.func.current_timestamp)

    def __repr__(self):
        return f'<User {self.email}>'
    
    def serialize(self):
        return{
            "id": self.id,
            "email": self.email,
            # you musn't serialize the password since it'd be a security breach! <3
        }
    

class Todo(db.Model):
    id = db.Column(db.Intege, primary_key=True)
    label = db.Column(db.String(225), unique=False, nullable=False)
    done = db.Column(db.Boolean, unique=False, nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp(), nullable=False)
    updated_at = db.Column(db.DateTime, onupdate=db.func.current_timestamp(), default=db.func.current_timestamp, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), unique=True, nullable=False)


    def __repr__(self):
        return f'<Todo {self.id}>'
    
    def serialize(self):
        return{
            "id": self.id,
            "label": self.label,
        }