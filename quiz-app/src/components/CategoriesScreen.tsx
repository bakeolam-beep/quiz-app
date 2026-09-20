import type { Category } from '../types';

interface CategoriesScreenProps {
  categories: Category[];
  onCategorySelect: (categoryId: string) => void;
  onBack: () => void;
}

export function CategoriesScreen({
  categories,
  onCategorySelect,
  onBack,
}: CategoriesScreenProps) {
  return (
    <main className="screen categories-screen" role="main">
      <header className="categories-header">
        <button
          type="button"
          className="btn btn-back"
          onClick={onBack}
          aria-label="Back to welcome"
        >
          ← Back
        </button>
        <h1 className="categories-title">Select a Category</h1>
        <p className="categories-subtitle">Choose a topic to test your knowledge</p>
      </header>

      <div className="categories-grid" role="list">
        {categories.map((category) => (
          <article
            key={category.id}
            className="category-card"
            role="listitem"
            onClick={() => onCategorySelect(category.id)}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onCategorySelect(category.id);
              }
            }}
          >
            <span className="category-icon" aria-hidden="true">{category.icon}</span>
            <h2 className="category-name">{category.name}</h2>
            <p className="category-description">{category.description}</p>
          </article>
        ))}
      </div>
    </main>
  );
}