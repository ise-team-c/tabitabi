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
        # Read existing plans
        if not DATA_DIR_PATH.exists():
            DATA_DIR_PATH.mkdir()

        plan_dir_path = DATA_DIR_PATH / "yamasato" / request.form["plan_name"]
        if not plan_dir_path.exists():
            plan_dir_path.mkdir(parents=True)

        json_path = plan_dir_path / f"{request.form['date']}.json"
        if json_path.exists():
            with json_path.open("r") as f:
                plan_info = json.load(f)
        else:
            plan_info = {"plan": []}

        event_info = {}
        event_info["start_time"] = request.form["start_time"]
        event_info["end_time"] = request.form["end_time"]
        event_info["event_name"] = request.form["event_name"]
        event_info["event_memo"] = request.form["event_memo"]
        plan_info["plan"].append(event_info)

        with json_path.open("w") as f:
            json.dump(plan_info, f, indent=4)

        return redirect(url_for("plan.index"))

    return render_template("plan/create.html")
