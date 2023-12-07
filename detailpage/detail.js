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

// 日程の追加(createPlan)作成中
function adddDate(){
  // 新たな日程を作成
  var newDate = document.createElement('table');
  newDate.setAttribute('id', 'Date');
  
  // ヘッダーを追加
}