const DRAWER_ID = "my-drawer-1";

export const DrawerButton = () => {
	return (
		<label htmlFor={DRAWER_ID} className="btn drawer-button bottom-0 left-0">
			Open drawer
		</label>
	);
};

export const Drawer = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="drawer">
			<input id={DRAWER_ID} type="checkbox" className="drawer-toggle" />
			<div className="drawer-content relative">
				{/* Page content here */}
				{/* <DrawerButton /> */}
				{children}
				<DrawerButton />
			</div>
			<div className="drawer-side">
				<label
					htmlFor={DRAWER_ID}
					aria-label="close sidebar"
					className="drawer-overlay"
				></label>
				<ul className="menu min-h-full w-80 bg-base-200 p-4">
					{/* Sidebar content here */}
					<li>
						<a>Sidebar Item 1</a>
					</li>
					<li>
						<a>Sidebar Item 2</a>
					</li>
				</ul>
			</div>
		</div>
	);
};
