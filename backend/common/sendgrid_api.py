from decouple import config
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail


def send_login_email(to_email, username, password):
    # Abrir e ler o conteúdo do arquivo HTML
    with open('templates/common/email.html', 'r') as file:
        email_content = file.read()

    # Substituir os placeholders pelo username e password fornecidos
    email_content = email_content.replace('[Username]', username)
    email_content = email_content.replace('[Password]', password)

    # Criar o objeto de e-mail
    message = Mail(
        from_email=config('SERVER_EMAIL'),
        to_emails=to_email,
        subject=f'Login Information for Your Mini Blog Account',
        html_content=email_content
    )

    try:
        # Enviar o e-mail usando a API do SendGrid
        sg = SendGridAPIClient(config('SENDGRID_API_KEY'))
        response = sg.send(message)
        print("E-mail enviado com sucesso!")
        print("Status Code:", response.status_code)
        print("Body:", response.body)
        print("Headers:", response.headers)
    except Exception as e:
        print("Erro ao enviar e-mail:", e)



