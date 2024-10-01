import Header from '../Header';
import { useParams } from 'react-router-dom';
import Footer from '../Footer';
import CategoryListPage from '../../pages/CategoryListPage';

function CategoryListLayout() {
  const { title } = useParams<{ title: string }>();

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow overflow-y-auto">
        <CategoryListPage
            selected={title!}
            categories={[
                { id: 'Computer Science', label: 'Computer Science' },
                { id: 'Physics', label: 'Physics' },
                { id: 'Mathematics', label: 'Mathematics' },
                { id: 'Quantitative Biology ', label: 'Quantitative Biology' },
                { id: 'Statistics', label: 'Statistics' },
                { id: 'Economics', label: 'Economics' },
                { id: 'Quantitative Finance', label: 'Quantitative Finance' },
                { id: 'Electrical Engineering', label: 'Electrical Engineering and Systems Science' },
            ]}
            papers={[
                {
                id: '1',
                title: 'Navigating Process Mining: A Case study using pm4py',
                authors: 'Ali Jidi, László Kovács',
                link: `/abs/${2409.01294}`,
                categories: 'Artificial Intelligence',
                arxiv_id: '2409.01294',
                },
                {
                id: '1',
                title: 'Navigating Process Mining: A Case study using pm4py',
                authors: 'Ali Jidi, László Kovács',
                link: `/abs/${2409.01294}`,
                categories: 'Artificial Intelligence',
                arxiv_id: '2409.01294',
                },
                {
                id: '1',
                title: 'Navigating Process Mining: A Case study using pm4py',
                authors: 'Ali Jidi, László Kovács',
                link: `/abs/${2409.01294}`,
                categories: 'Artificial Intelligence',
                arxiv_id: '2409.01294',
                },
                {
                id: '1',
                title: 'Navigating Process Mining: A Case study using pm4py',
                authors: 'Ali Jidi, László Kovács',
                link: `/abs/${2409.01294}`,
                categories: 'Artificial Intelligence',
                arxiv_id: '2409.01294',
                },
                {
                id: '1',
                title: 'Navigating Process Mining: A Case study using pm4py',
                authors: 'Ali Jidi, László Kovács',
                link: `/abs/${2409.01294}`,
                categories: 'Artificial Intelligence',
                arxiv_id: '2409.01294',
                },
                {
                id: '1',
                title: 'Navigating Process Mining: A Case study using pm4py',
                authors: 'Ali Jidi, László Kovács',
                link: `/abs/${2409.01294}`,
                categories: 'Artificial Intelligence',
                arxiv_id: '2409.01294',
                },
                {
                id: '1',
                title: 'Navigating Process Mining: A Case study using pm4py',
                authors: 'Ali Jidi, László Kovács',
                link: `/abs/${2409.01294}`,
                categories: 'Artificial Intelligence',
                arxiv_id: '2409.01294',
                },
                                
            ]}
        />

      </div>
      <Footer />
    </div>
  );
}

export default CategoryListLayout;
