import json
from pathlib import Path

from flask import Blueprint, redirect, render_template, request, url_for

DATA_DIR_PATH = Path(__file__).parent.parent.resolve() / "data"

bp = Blueprint("plan", __name__)


@bp.route("/")
def index():
    return render_template("plan/index.html")


@bp.route("/create", methods=("GET", "POST"))
def create():
    if request.method == "POST":
        plan_info = {}
        plan_info["date"] = request.form["date"]
        plan_info["plan_name"] = request.form["plan_name"]
        plan_info["plan_memo"] = request.form["plan_memo"]

        # Save a new plan
        if not DATA_DIR_PATH.exists():
            DATA_DIR_PATH.mkdir()

        json_path = DATA_DIR_PATH / "plan.json"
        with json_path.open("w") as f:
            json.dump(plan_info, f, indent=4)

        return redirect(url_for("plan.index"))

    return render_template("plan/create.html")
