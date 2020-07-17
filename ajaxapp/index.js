function main() {
  // fetchUserInfoで取得とcreateViewとdisplayViewをやっていると見通し悪い
  // thenに渡されたコールバック関数の戻り値をそのまま次のhenへ渡す
  // Promiseである場合は、そのPromiseで解決された値を次のthenにわたす
  // 同期処理から非同期処理に変わったとしても次のthenが受け取る値の型は変わらない
  // thenを使ってつなぐことで変更に強い。同期処理から非同期処理に変更できるため
  fetchUserInfo("js-primer-example")
    .then((userInfo) => {
      return createView(userInfo);
    })
    .then((view) => {
      displayView(view);
    })
    .catch((err) => {
      console.error(err);
    });
}

function fetchUserInfo(userId) {
  // Promiseでmainにかえして、main関数の方で非同期処理の結果を扱えるようになる
  // Promiseチェーンの中で投げられたエラーは一箇所で受け取れる
  // 外側でエラー受け取ったほうが良さそう
  return fetch(
    `https://api.github.com/users/${encodeURIComponent(userId)}`
  ).then((response) => {
    console.log(response.status);
    if (!response.ok) {
      // rejectメソッドを使って、Promiseチェーンをエラー状態にして、main関数のcatchでハンドリングできる
      return Promise.reject(
        new Error(`${response.status}: ${response.statusText}`)
      );
    } else {
      return response.json();
    }
  });
}

function createView(userInfo) {
  return escapeHTML`
  <h4>${userInfo.name} (@${userInfo.login})</h4>
  <img src="${userInfo.avatar_url}" alt="${userInfo.login}" height="100">
  <dl>
      <dt>Location</dt>
      <dd>${userInfo.location}</dd>
      <dt>Repositories</dt>
      <dd>${userInfo.public_repos}</dd>
  </dl>
  `;
}

function displayView(view) {
  const result = document.getElementById("result");
  result.innerHTML = view;
}

function escapeSpecialChars(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
function escapeHTML(strings, ...values) {
  return strings.reduce((result, str, i) => {
    const value = values[i - 1];
    if (typeof value === "string") {
      return result + escapeSpecialChars(value) + str;
    } else {
      return result + String(value) + str;
    }
  });
}
