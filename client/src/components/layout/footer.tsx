import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">선과색미술학원</h3>
            <p className="text-slate-300 mb-4 max-w-md">
              예중/예고, 미대입시 전문학원으로 체계적인 교육을 통해 학생들의 꿈을 실현해드립니다.
            </p>
            <p className="text-slate-400 text-sm mb-4">
              학원등록번호: 제2030호
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <i className="fab fa-facebook-f text-xl"></i>
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <i className="fab fa-linkedin-in text-xl"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">빠른 링크</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="text-slate-300 hover:text-white transition-colors">홈</a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-slate-300 hover:text-white transition-colors">학원소개</a>
                </Link>
              </li>
              <li>
                <Link href="/notices">
                  <a className="text-slate-300 hover:text-white transition-colors">공지사항</a>
                </Link>
              </li>
              <li>
                <Link href="/gallery">
                  <a className="text-slate-300 hover:text-white transition-colors">작품갤러리</a>
                </Link>
              </li>
              <li>
                <Link href="/admin">
                  <a className="text-slate-300 hover:text-white transition-colors">관리자</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">입시정보</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/middle-school">
                  <a className="text-slate-300 hover:text-white transition-colors">예중입시정보</a>
                </Link>
              </li>
              <li>
                <Link href="/high-school">
                  <a className="text-slate-300 hover:text-white transition-colors">예고입시정보</a>
                </Link>
              </li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">미대 입시</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">기초 과정</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-8 pt-8 text-center">
          <p className="text-slate-400">
            © 2024 선과색미술학원. All rights reserved. | 
            <a href="#" className="hover:text-white transition-colors ml-1">개인정보처리방침</a> | 
            <a href="#" className="hover:text-white transition-colors ml-1">이용약관</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
