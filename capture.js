(() => {
  let hrefs = [], titles = [], publishers = [], dates = [], prices = [];
  let thisNode;


  // �ּ�, ����
  const titlesWithHref = document.evaluate("//td[@class='goodsTxtInfo']/p[1]/a[1]", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE);

  thisNode = titlesWithHref.iterateNext();
  while(thisNode) {
    hrefs.push(thisNode.href);
    titles.push(thisNode.text);
    thisNode = titlesWithHref.iterateNext();
  }


  // ���ǻ�, �Ⱓ��
  const authorEtcs = document.evaluate("//td[@class='goodsTxtInfo']/div[@class='aupu']", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE);

  thisNode = authorEtcs.iterateNext();
  while(thisNode) {
    publishers.push(thisNode.innerText.split("|")[1].trim());
    dates.push(thisNode.innerText.split("|")[2].trim());
    thisNode = authorEtcs.iterateNext();
  }


  // ����
  const pricesWithArrow = document.evaluate("//td[@class='goodsTxtInfo']/p[2]/text()[1]", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE);

  thisNode = pricesWithArrow.iterateNext();
  while(thisNode) {
    prices.push(parseInt(thisNode.wholeText.replace("�� ��", "").replace(",", "")));
    thisNode = pricesWithArrow.iterateNext();
  }


  // ���
  let output = "<table>";
  //output += "<thead><tr><td>�ּ�</td><td>����</td><td></td><td>���ǻ�</td><td>�Ⱓ��</td><td></td><td>����</td></tr></thead>";

  output += "<tbody>";
  for(let i = 0; i < hrefs.length; i++) {
    output += "<tr>";
    output += "<td>" + (i+1) + "</td>";
    output += "<td>" + hrefs[i] + "</td>";
    output += "<td>" + titles[i] + "</td>";
    output += "<td></td>";
    output += "<td>" + publishers[i] + "</td>";
    output += "<td>" + dates[i] + "</td>";
    output += "<td></td>";
    output += "<td>" + prices[i] + "</td>";
    output += "</tr>";
  }
  output += "</tbody></table>";

  myWindow = window.open('', '', 'width=1280, height=576');
  myWindow.document.write(output);
})();