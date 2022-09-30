import { useUI } from "@modules/common/hooks/ui-context";
import { DismissIcon, MoreVerticalIcon } from "@modules/ui/icons/menu-icons";
import { ScrollBox } from "@modules/ui/scroll-area";
import * as Dialog from "@radix-ui/react-dialog";
import { Transition } from "@headlessui/react";
import { Fragment } from "react";

export const Sidebar = () => {
	const { sidebarIsOpen, openSidebar, closeSidebar } = useUI();

	return (
		<Dialog.Root
			open={sidebarIsOpen}
			onOpenChange={(open) => (open ? openSidebar() : closeSidebar())}
		>
			<Dialog.Trigger asChild>
				<button>
					<MoreVerticalIcon className="w-8 h-8" />
				</button>
			</Dialog.Trigger>
			<Transition.Root show={sidebarIsOpen}>
				<Dialog.Portal forceMount>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-200"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="fixed top-0 bottom-0 left-0 right-0 bg-black/50" />
					</Transition.Child>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-200"
						enterFrom="translate-x-full"
						enterTo="translate-x-0"
						leave="ease-in duration-200"
						leaveFrom="translate-x-0"
						leaveTo="translate-x-full"
					>
						<Dialog.Content className="fixed top-0 right-0 sc bottom-0 w-full max-w-[450px] bg-white shadow-lg z-[8000]">
							<Dialog.Close aria-label="Close">
								<DismissIcon className="w-8 h-8" />
							</Dialog.Close>

							<ScrollBox>
								<div className="w-full h-[400vh]">
									<h1>Sidebar</h1>
								</div>
							</ScrollBox>
						</Dialog.Content>
					</Transition.Child>
				</Dialog.Portal>
			</Transition.Root>
		</Dialog.Root>
	);
};

/* <div className="drawer drawer-end">
		<input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
		<div className="drawer-content">
			// <!-- Page content here -->
			<label htmlFor="my-drawer-4" className="drawer-button btn btn-primary">
				Open drawer
			</label>
		</div>
		<div className="drawer-side">
			<label htmlFor="my-drawer-4" className="drawer-overlay"></label>
			<ul className="p-4 overflow-y-auto menu w-80 bg-base-100 text-base-content">
				// <!-- Sidebar content here --> 
				<li>
					<a>Sidebar Item 1</a>
				</li>
				<li>
					<a>Sidebar Item 2</a>
				</li>
			</ul>
		</div>
	</div> */
