import "./SubHeader3.css"

function SubHeader3() {
    return (
      <nav className="HeaderNav">
      <ul>
          <li><a href="/Finance">Finance</a></li>
          <li><a href="/Economic">Economic</a></li>
          <li><a href="/Business">Business</a></li>
          <li><a href="/Entrepreneur">Entrepreneurship</a></li>
          <li><a href="#">Interview</a></li>
          <li><a href="#">Podcast</a></li>
          <span className="separator"></span>
          <li><a href="#">Contact</a></li>
      </ul>
  </nav>
    )
}

export default SubHeader3;