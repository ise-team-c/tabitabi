// 予定の追加
function addRow() {
  // 表のtbody要素を取得
  var tbody = document.getElementById('schedule').getElementsByTagName('tbody')[0];

  // 新しい行を作成
  var newRow = tbody.insertRow();

  // 新しい行にセルを挿入
  var stimeCell = newRow.insertCell(0);
  var etimeCell = newRow.insertCell(1);
  var eventCell = newRow.insertCell(2);
  var memoCell = newRow.insertCell(3);

  // セルにinput要素を追加
  stimeCell.innerHTML = '<input type="time">';
  etimeCell.innerHTML = '<input type="time">';
  eventCell.innerHTML = '<input type="text" placeholder="イベントを入力">';
  memoCell.innerHTML = '<input type="text" placeholder="備考欄">';
}

// 予定の削除
function deleteRow() {
  // 表のtbody要素を取得
  var tbody = document.getElementById('schedule').getElementsByTagName('tbody')[0];

  // tbody要素にある最後の行を削除
  tbody.deleteRow(-1);
}

// ------ データ保存 ------

// 1日のスケジュールデータを保存する関数(バックエンドに送る機能追加中)
function saveSchedule() {
  // スケジュールデータを収集
  var scheduleData = [];
  var table = document.getElementById('schedule');
  var rows = table.getElementsByTagName('tr');

  for (var i = 1; i < rows.length; i++) {
    var cells = rows[i].getElementsByTagName('td');
    console.log(cells);

    var date = document.getElementById('tripdate');

    var starttime = cells[0].firstElementChild.value;
    var endtime = cells[1].firstElementChild.value;
    var title = cells[2].firstElementChild.value;
    var memo = cells[3].firstElementChild.value;

    // データをオブジェクトにまとめて配列に追加
    scheduleData.push({
      start_time: starttime,
      end_time: endtime,
      event_name: title,
      event_memo: memo
    });
  }

  var jsonData = JSON.stringify({
    date: date.value,
    plan: scheduleData
  });

  
  // バックエンドのURL
  var backendUrl = '/create';

  // Fetch APIを使ってデータをバックエンドに送信
  fetch(backendUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    // body: JSON.stringify(jsonData)
    body: jsonData
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('Data sent successfully:', data);
    // 送信成功時の処理をここに追加
  })
  .catch(error => {
    console.error('Error sending data to backend:', error);
    // エラー時の処理をここに追加
  });

  // ローカルストレージにスケジュールデータを保存
  // localStorage.setItem('scheduleData', JSON.stringify(scheduleData));
  localStorage.setItem('scheduleData', jsonData);

  // ユーザーに保存が完了したことを通知（任意）
  alert('スケジュールデータが保存されました。');
}


// 保存したスケジュールデータをコンソールに表示して確認
function displaySchedule() {
  // ローカルストレージからスケジュールデータを取得
  var storedScheduleData = localStorage.getItem('scheduleData');

  // データが存在するか確認
  if (storedScheduleData) {
    // JSON文字列をJavaScriptオブジェクトにパース
    var scheduleData = JSON.parse(storedScheduleData);

    // コンソールにデータを出力
    console.log(scheduleData);
  } else {
    console.log('保存されたスケジュールデータはありません。');
  }
}
