import { useState } from 'react';
import {
  VscHome, VscFolder, VscEllipsis, VscBook, VscClose, VscSourceControl,
  VscRepo, VscChevronRight, VscFileCode, VscMenu,
} from 'react-icons/vsc';
import './IdeLayout.css';

// Root folder; every node with a `page` flag can be opened as a tab.
// Node ids double as paths (e.g. projects/project-alpha).
const TREE = {
  id: 'root', label: 'jiayingchen.dev', icon: VscRepo, children: [
    { id: 'home', label: 'home.exe', icon: VscHome, page: true },
    {
      id: 'projects', label: 'projects/', icon: VscFolder, page: true, children: [
        { id: 'projects/project-alpha', label: 'project-alpha.exe', page: true },
        { id: 'projects/project-beta', label: 'project-beta.exe', page: true },
        { id: 'projects/project-gamma', label: 'project-gamma.exe', page: true },
        { id: 'projects/project-delta', label: 'project-delta.exe', page: true },
      ],
    },
    { id: 'misc', label: 'misc.sh', icon: VscEllipsis, page: true },
    { id: 'blog', label: 'blog.md', icon: VscBook, page: true },
  ],
};

const NODES = {};
const index = (node) => {
  NODES[node.id] = node;
  node.children?.forEach(index);
};
index(TREE);

const isOnPath = (id, active) => active === id || active.startsWith(`${id}/`);

const TreeNode = ({ node, active, expanded, onOpen, onToggle, className = '' }) => {
  const Icon = node.icon ?? VscFileCode;
  const isFolder = !!node.children;
  const isOpen = expanded.has(node.id);
  const pathIndex = isFolder ? node.children.findIndex((c) => isOnPath(c.id, active)) : -1;

  const handleClick = () => {
    if (node.page) onOpen(node.id);
    else onToggle(node.id);
  };

  return (
    <li className={`tree-node ${className}`}>
      <div className={`tree-row ${active === node.id ? 'is-active' : ''}`}>
        {isFolder && (
          <button
            className={`tree-chevron ${isOpen ? 'is-open' : ''}`}
            onClick={() => onToggle(node.id)}
            aria-label={`${isOpen ? 'collapse' : 'expand'} ${node.label}`}
            aria-expanded={isOpen}
          >
            <VscChevronRight />
          </button>
        )}
        <button className="tree-label" onClick={handleClick} title={node.label}>
          <Icon className="tree-icon" />
          <span>{node.label}</span>
        </button>
      </div>

      {isFolder && (
        <div className={`tree-collapse ${isOpen ? 'is-open' : ''}`}>
          <ul className="tree-children">
            {node.children.map((child, i) => (
              <TreeNode
                key={child.id}
                node={child}
                active={active}
                expanded={expanded}
                onOpen={onOpen}
                onToggle={onToggle}
                className={i === pathIndex ? 'on-path' : i < pathIndex ? 'path-pass' : ''}
              />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

const IdeLayout = () => {
  const [tabs, setTabs] = useState(['home']);
  const [active, setActive] = useState('home');
  const [expanded, setExpanded] = useState(new Set(['root', 'projects']));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const open = (id) => {
    if (!tabs.includes(id)) setTabs([...tabs, id]);
    setActive(id);
    if (NODES[id].children) setExpanded(new Set([...expanded, id]));
    setDrawerOpen(false);
  };

  const toggle = (id) => {
    const next = new Set(expanded);
    next.has(id) ? next.delete(id) : next.add(id);
    setExpanded(next);
  };

  const close = (id, e) => {
    e.stopPropagation();
    const i = tabs.indexOf(id);
    const next = tabs.filter((t) => t !== id);
    setTabs(next);
    if (active === id) setActive(next[Math.max(0, i - 1)]);
  };

  return (
    <div className="ide">
      <div className="ide-main">
        <nav className={`ide-sidebar ${drawerOpen ? 'is-open' : ''}`}>
          <div className="ide-sidebar-title">EXPLORER</div>
          <ul className="tree">
            <TreeNode
              node={TREE}
              active={active}
              expanded={expanded}
              onOpen={open}
              onToggle={toggle}
            />
          </ul>
        </nav>
        {drawerOpen && <div className="ide-backdrop" onClick={() => setDrawerOpen(false)} />}

        <section className="ide-editor">
          <div className="ide-tabs" role="tablist">
            <button className="ide-menu-btn" onClick={() => setDrawerOpen(true)} aria-label="open explorer">
              <VscMenu />
            </button>
            {tabs.map((id) => {
              const { label, icon: Icon = VscFileCode } = NODES[id];
              return (
              <div
                key={id}
                role="tab"
                aria-selected={active === id}
                className={`ide-tab ${active === id ? 'is-active' : ''}`}
                onClick={() => setActive(id)}
              >
                <Icon className="ide-tab-icon" />
                <span>{label}</span>
                {id !== 'home' && (
                  <button className="ide-tab-close" onClick={(e) => close(id, e)} aria-label={`close ${label}`}>
                    <VscClose />
                  </button>
                )}
              </div>
              );
            })}
          </div>

          <div className="ide-terminal">
            <div className="ide-terminal-header">TERMINAL</div>
            <div className="ide-terminal-body">
              <span className="ide-prompt">(based) jiayingchen.dev</span>
              <span className="ide-path">:~{active ? `/${active}` : ''}</span>
              <span>$ </span>
              <span className="ide-cursor" />
            </div>
          </div>
        </section>
      </div>

      <footer className="ide-statusbar">
        <VscSourceControl />
        <span>main</span>
      </footer>
    </div>
  );
};

export default IdeLayout;
