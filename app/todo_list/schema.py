from marshmallow import Schema, fields

class TaskSchema(Schema):
    id = fields.Int(required = True)
    completed = fields.Bool()
    task_url = fields.URL()


class TodoListSchema(TaskSchema):
    user_id = fields.Email(required = True)