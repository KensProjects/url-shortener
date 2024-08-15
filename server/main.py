from flask import Flask, request, jsonify, redirect
from flask_cors import CORS

from database import start_db, check_url, get_redirect_url
from validators import ValidationError, url

app = Flask(__name__)
CORS(app)

start_db()

@app.route("/<short_url>", methods=["GET"])
def go_to_short_url(short_url):
    try:
        url_obj = get_redirect_url(short_url)
        real_url = url_obj["original_url"]
        try:
            return redirect(real_url)
        except:
            return {"error": "Redirection to original URL failed!"}
    except:
        return {"error": "Shortened URL not found!"}


@app.route("/", methods=["POST"])
def checkUrl():
    try:
        orig_url: str = request.get_json()["url"]
        validation_success = url(orig_url)
        if validation_success == True:
            new_url = jsonify((check_url(orig_url)))
            return new_url

    except ValidationError as err:
        return {"error": "Invalid url."}


if __name__ == "__main__":
    app.run()
